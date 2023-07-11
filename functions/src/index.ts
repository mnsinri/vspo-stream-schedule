import * as admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as youtube from "./youtube";
import * as twitch from "./twitch";
import * as logger from "firebase-functions/logger";
// import { functionCache } from "./types";

admin.initializeApp();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const VSPO_YOUTUBE_CHANNELS_PATH = process.env.VSPO_YOUTUBE_CHANNELS_PATH;
const VSPO_TWITCH_CHANNELS_PATH = process.env.VSPO_TWITCH_CHANNELS_PATH;
const YOUTUBE_CHANNELS_DATA_PATH = process.env.YOUTUBE_CHANNELS_DATA_PATH;
const YOUTUBE_STREAMS_DATA_PATH = process.env.YOUTUBE_STREAMS_DATA_PATH;
const TWITCH_CHANNELS_DATA_PATH = process.env.TWITCH_CHANNELS_DATA_PATH;
const TWITCH_STREAMS_DATA_PATH = process.env.TWITCH_STREAMS_DATA_PATH;

// const cache: functionCache = {
//   youtubeChannelIds: [],
//   twitchChennelIds: [],
// };

const db = getDatabase();

// db.ref(VSPO_YOUTUBE_CHANNELS_PATH).on("value", (snap) => {
//   if (snap.exists()) {
//     cache.youtubeChannelIds = snap.val();
//     logger.log("[VspoStreamSchedule] on youtube channels updated", {
//       length: cache.youtubeChannelIds.length,
//     });
//   }
// });

// db.ref(VSPO_TWITCH_CHANNELS_PATH).on("value", (snap) => {
//   if (snap.exists()) {
//     cache.twitchChennelIds = snap.val();
//     logger.log("[VspoStreamSchedule] on twitch channels updated", {
//       length: cache.twitchChennelIds.length,
//     });
//   }
// });

// const checkCahce = async () => {
//   if (!cache.youtubeChannelIds.length) {
//     const snap = await db.ref(VSPO_YOUTUBE_CHANNELS_PATH).get();
//     cache.youtubeChannelIds = snap.val() ?? [];
//   }

//   if (!cache.twitchChennelIds.length) {
//     const snap = await db.ref(VSPO_TWITCH_CHANNELS_PATH).get();
//     cache.twitchChennelIds = snap.val() ?? [];
//   }
// };

export const updateChannels = onSchedule(
  {
    schedule: "0 15 * * *",
    secrets: ["YOUTUBE_API", "TWITCH_TOKEN", "TWITCH_CLIENT_ID"],
  },
  async (_) => {
    const ytChSnap = await db.ref(VSPO_YOUTUBE_CHANNELS_PATH).get();
    if (ytChSnap.exists()) {
      const ytChannels = await youtube.getChannels(
        YOUTUBE_API_KEY,
        ytChSnap.val()
      );
      db.ref(YOUTUBE_CHANNELS_DATA_PATH).set(ytChannels);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateChannels] youtube channels dont exist in rtdb"
      );
    }

    const twChSnap = await db.ref(VSPO_TWITCH_CHANNELS_PATH).get();
    if (twChSnap.exists()) {
      const twChannels = await twitch.getChannels(
        TWITCH_TOKEN,
        TWITCH_CLIENT_ID,
        twChSnap.val()
      );
      db.ref(TWITCH_CHANNELS_DATA_PATH).set(twChannels);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateChannels] twitch channels dont exist in rtdb"
      );
    }
  }
);

export const updateStreams = onSchedule(
  {
    schedule: "0,10,20,30,40,50 * * * *",
    secrets: ["YOUTUBE_API", "TWITCH_TOKEN", "TWITCH_CLIENT_ID"],
  },
  async (_) => {
    const ytChSnap = await db.ref(VSPO_YOUTUBE_CHANNELS_PATH).get();
    if (ytChSnap.exists()) {
      const ytStreams = await youtube.getStreams(
        YOUTUBE_API_KEY,
        ytChSnap.val()
      );
      db.ref(YOUTUBE_STREAMS_DATA_PATH).set(ytStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] youtube channels dont exist in rtdb"
      );
    }

    const twChSnap = await db.ref(VSPO_TWITCH_CHANNELS_PATH).get();
    if (twChSnap.exists()) {
      const twStreams = await twitch.getStreams(
        TWITCH_TOKEN,
        TWITCH_CLIENT_ID,
        twChSnap.val()
      );
      db.ref(TWITCH_STREAMS_DATA_PATH).set(twStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twitch channels dont exist in rtdb"
      );
    }
  }
);
