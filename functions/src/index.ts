import * as admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as youtube from "./youtube";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

const API_KEY = process.env.YOUTUBE_API;
const VSPO_YOUTUBE_CHANNELS_PATH = process.env.VSPO_YOUTUBE_CHANNELS_PATH;
const YOUTUBE_CHANNELS_DATA_PATH = process.env.YOUTUBE_CHANNELS_DATA_PATH;
const YOUTUBE_STREAMS_DATA_PATH = process.env.YOUTUBE_STREAMS_DATA_PATH;

type functionCache = {
  youtubeChannelIds: string[];
};
const cache: functionCache = {
  youtubeChannelIds: [],
};

const db = getDatabase();

db.ref(VSPO_YOUTUBE_CHANNELS_PATH).on("value", (snap) => {
  cache.youtubeChannelIds = snap.val();
  logger.log(
    "[VspoStreamSchedule] on youtube channels updated",
    cache.youtubeChannelIds
  );
});

export const updateChannels = onSchedule(
  { schedule: "0 15 * * *", secrets: ["YOUTUBE_API"] },
  async (_) => {
    const channels = await youtube.getChannels(
      API_KEY,
      cache.youtubeChannelIds
    );
    db.ref(YOUTUBE_CHANNELS_DATA_PATH).set(channels);

    logger.log("[VspoStreamSchedule] updateChannels");
  }
);

export const updateStreams = onSchedule(
  { schedule: "0,10,20,30,40,50 * * * *", secrets: ["YOUTUBE_API"] },
  async (_) => {
    const streams = await youtube.getStreamings(
      API_KEY,
      cache.youtubeChannelIds
    );
    db.ref(YOUTUBE_STREAMS_DATA_PATH).set(streams);

    logger.log("[VspoStreamSchedule] updateStreams");
  }
);
