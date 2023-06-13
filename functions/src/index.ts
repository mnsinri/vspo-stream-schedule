import * as admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
// import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as youtube from "./youtube";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

const API_KEY = process.env.YOUTUBE_API;
const CHANNELS_PATH = process.env.DATABASE_CHANNELS_PATH;
const STREAMS_PATH = process.env.DATABASE_STREAMS_PATH;

const db = getDatabase();
// const cache = new Map<string, Array<any>>();
// cache.set(CHANNELS_PATH, []);
// cache.set(STREAMS_PATH, []);

// db.ref(CHANNELS_PATH).on("value", (snap) => {
//   logger.info("[VspoStreamSchedule] onValueCreated channels");
//   if (snap.exists()) {
//     cache.set(CHANNELS_PATH, snap.val());
//   }
// });
// db.ref(STREAMS_PATH).on("value", (snap) => {
//   logger.info("[VspoStreamSchedule] onValueCreated streams");
//   if (snap.exists()) {
//     cache.set(STREAMS_PATH, snap.val());
//   }
// });

export const updateChannels = onSchedule(
  { schedule: "0 15 * * *", secrets: ["YOUTUBE_API"] },
  async (_) => {
    const channels = await youtube.getChannels(API_KEY);
    db.ref(`${CHANNELS_PATH}/youtube`).set(channels);

    logger.log("[VspoStreamSchedule] updateChannels");
  }
);

export const updateStreams = onSchedule(
  { schedule: "0,10,20,30,40,50 * * * *", secrets: ["YOUTUBE_API"] },
  async (_) => {
    const streams = await youtube.getStreamings(API_KEY);
    db.ref(`${STREAMS_PATH}/youtube`).set(streams);

    logger.log("[VspoStreamSchedule] updateStreams");
  }
);

// export const getChannels = onCall({ enforceAppCheck: true }, async (req) => {
//   if (req.app == undefined) {
//     throw new HttpsError(
//       "failed-precondition",
//       "The function must be called from an App Check verified app."
//     );
//   }

//   logger.log("[VspoStreamSchedule] getChannels");
//   return cache.get(CHANNELS_PATH);
// });

// export const getStreams = onCall({ enforceAppCheck: true }, async (req) => {
//   if (req.app == undefined) {
//     throw new HttpsError(
//       "failed-precondition",
//       "The function must be called from an App Check verified app."
//     );
//   }

//   logger.log("[VspoStreamSchedule] getStreams");
//   return cache.get(STREAMS_PATH);
// });
