import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { Streamer } from "../types";
import { YoutubeClient, TwitchClient, TwitCastingClient } from "./api";
import { defineConfig, sortStreams } from "./utils";
import { createMaster } from "./createMater";

initializeApp();
const config = defineConfig();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

const getStreamerMaster = async () => {
  const youtubeChannelIdMap = new Map<string, string>();
  const twitchChannelIdMap = new Map<string, string>();
  const twitCastingChannelIdMap = new Map<string, string>();
  const baseStreamers: Record<string, { order: number }> = {};

  const master = await db.collection(config.collection.master.value()).get();
  master.forEach((doc) => {
    const id = doc.id;
    const { youtube, twitch, twitCasting, order } = doc.data();

    if (youtube) youtubeChannelIdMap.set(youtube, id);
    if (twitch) twitchChannelIdMap.set(twitch, id);
    if (twitCasting) twitCastingChannelIdMap.set(twitCasting, id);
    if (Number.isFinite(order)) baseStreamers[id] = { order };
  });

  return {
    youtube: youtubeChannelIdMap,
    twitch: twitchChannelIdMap,
    twitCasting: twitCastingChannelIdMap,
    baseStreamers,
  };
};

export const getStreamers = onSchedule(
  {
    schedule: "every day 23:55",
    secrets: [
      ...Object.values(config.twitch),
      ...Object.values(config.twitCasting),
    ],
    timeZone: "Asia/Tokyo",
    region: "asia-northeast1",
  },
  async () => {
    // init
    const { baseStreamers, ...idMap } = await getStreamerMaster();
    const tokenDoc = db
      .collection(config.collection.secrets.value())
      .doc(config.document.token.value());
    const youtubeClient = new YoutubeClient(tokenDoc);
    const twitchClient = new TwitchClient(tokenDoc, config.twitch);
    const twitClient = new TwitCastingClient(tokenDoc, config.twitCasting);

    // get channels
    const getChannels = [
      youtubeClient.getChannels([...idMap.youtube.keys()]),
      twitchClient.getChannels([...idMap.twitch.keys()]),
      twitClient.getChannels([...idMap.twitCasting.keys()]),
    ];
    const channels = (await Promise.all(getChannels)).flat();

    const streamers = channels.reduce(
      (result, ch) => {
        const key = idMap[ch.platform].get(ch.id);

        if (key) result[key] = { ...result[key], [ch.platform]: ch };

        return result;
      },
      baseStreamers as Record<string, Streamer>,
    );

    // create and update db
    const batch = db.batch();
    const streamerRef = db.collection(config.collection.streamers.value());

    for (const [key, data] of Object.entries(streamers))
      batch.set(streamerRef.doc(key), data);

    await batch.commit();
  },
);

export const getStreams = onSchedule(
  {
    schedule: "every 10 minutes synchronized",
    secrets: [
      ...Object.values(config.twitch),
      ...Object.values(config.twitCasting),
    ],
    timeZone: "Asia/Tokyo",
    region: "asia-northeast1",
  },
  async () => {
    const endTime = new Date().toISOString();

    // init
    const master = await getStreamerMaster();
    const tokenDoc = db
      .collection(config.collection.secrets.value())
      .doc(config.document.token.value());
    const youtubeClient = new YoutubeClient(tokenDoc);
    const twitchClient = new TwitchClient(tokenDoc, config.twitch);
    const twitClient = new TwitCastingClient(tokenDoc, config.twitCasting);

    // get streams
    const getStreams = [
      youtubeClient.getStreams([...master.youtube.keys()]),
      twitchClient.getStreams([...master.twitch.keys()]),
      twitClient.getStreams([...master.twitCasting.keys()]),
    ];
    const streams = (await Promise.all(getStreams)).flat();

    // create and update db
    const batch = db.batch();
    const streamRef = db.collection(config.collection.streams.value());
    const snap = await streamRef.get();
    const { endedStreams, newStreams } = sortStreams(streams, snap.docs);

    for await (const { id, data } of endedStreams) {
      let stream = data;

      // if twitch stream, update stream info
      if (data.platform === "twitch") {
        try {
          stream = await twitchClient.updateStreamToVideo(data);
        } catch {
          batch.delete(streamRef.doc(id));
          continue;
        }
      }

      batch.update(streamRef.doc(id), { ...stream, endTime });
    }

    for (const newStream of newStreams) {
      const streamerId = master[newStream.platform].get(newStream.channelId);
      batch.set(streamRef.doc(), { ...newStream, streamerId });
    }

    await batch.commit();
  },
);

export const createStreamerMaster = onRequest(
  {
    region: "asia-northeast1",
  },
  async (_, res) => {
    createMaster(db, config.collection.master.value());
    res.status(200).send("updated");
  },
);
