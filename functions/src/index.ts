import * as admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as youtube from "./youtube";
import * as twitch from "./twitch";
import * as twitCasting from "./twitCasting";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

// export * from "./demo";

const db = getDatabase();

export const updateChannels = onSchedule(
  {
    schedule: "0 15 * * *",
    secrets: [
      "YOUTUBE_API",
      "TWITCH_TOKEN",
      "TWITCH_CLIENT_ID",
      "TWIT_CASTING_TOKEN",
    ],
  },
  async (_) => {
    const DATA_URI = process.env.DATA_URI;

    //youtube
    const YT_CHANNELIDS_PATH = process.env.YOUTUBE_CHANNELIDS_PATH;
    const YT_API_KEY = process.env.YOUTUBE_API;

    const ytChSnap = await db.ref(YT_CHANNELIDS_PATH).get();
    if (ytChSnap.exists()) {
      const ytChannels = await youtube.getChannels(YT_API_KEY, ytChSnap.val());
      db.ref(`${DATA_URI}/youtube/channels`).set(ytChannels);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateChannels] youtube channels dont exist in rtdb"
      );
    }

    //twitch
    const TW_TOKEN = process.env.TWITCH_TOKEN;
    const TW_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const TW_CHANNELIDS_PATH = process.env.TWITCH_CHANNELIDS_PATH;

    const twChSnap = await db.ref(TW_CHANNELIDS_PATH).get();
    if (twChSnap.exists()) {
      const twChannels = await twitch.getChannels(
        TW_TOKEN,
        TW_CLIENT_ID,
        twChSnap.val()
      );
      db.ref(`${DATA_URI}/twitch/channels`).set(twChannels);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateChannels] twitch channels dont exist in rtdb"
      );
    }

    //twit casting
    const TWC_TOKEN = process.env.TWIT_CASTING_TOKEN;
    const TWC_USERIDS_PATH = process.env.TWIT_CASTING_USERIDS_PATH;

    const twcUserIdsSnap = await db.ref(TWC_USERIDS_PATH).get();
    if (twcUserIdsSnap.exists()) {
      const twcChannels = await twitCasting.getChannels(
        TWC_TOKEN,
        twcUserIdsSnap.val()
      );
      db.ref(`${DATA_URI}/twitCasting/channels`).set(twcChannels);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twit casting userIds dont exist in rtdb"
      );
    }
  }
);

export const updateYoutubeStreams = onSchedule(
  {
    schedule: "0,10,20,30,40,50 * * * *",
    secrets: ["YOUTUBE_API"],
  },
  async (_) => {
    const DATA_URI = process.env.DATA_URI;

    const YT_CHANNELIDS_PATH = process.env.YOUTUBE_CHANNELIDS_PATH;
    const YT_API_KEY = process.env.YOUTUBE_API;

    const ytChSnap = await db.ref(YT_CHANNELIDS_PATH).get();
    if (ytChSnap.exists()) {
      const ytStreams = await youtube.getStreams(YT_API_KEY, ytChSnap.val());
      db.ref(`${DATA_URI}/youtube/streams`).set(ytStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] youtube channels dont exist in rtdb"
      );
    }
  }
);

export const updateTwitchAndTwitCastingStreams = onSchedule(
  {
    schedule: "1,11,21,31,41,51 * * * *",
    secrets: ["TWITCH_TOKEN", "TWITCH_CLIENT_ID", "TWIT_CASTING_TOKEN"],
  },
  async (_) => {
    const DATA_URI = process.env.DATA_URI;

    const TW_TOKEN = process.env.TWITCH_TOKEN;
    const TW_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const TW_CHANNELIDS_PATH = process.env.TWITCH_CHANNELIDS_PATH;

    const twChSnap = await db.ref(TW_CHANNELIDS_PATH).get();
    if (twChSnap.exists()) {
      const twStreams = await twitch.getStreams(
        TW_TOKEN,
        TW_CLIENT_ID,
        twChSnap.val()
      );
      db.ref(`${DATA_URI}/twitch/streams`).set(twStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twitch channels dont exist in rtdb"
      );
    }

    const TWC_TOKEN = process.env.TWIT_CASTING_TOKEN;
    const TWC_USERIDS_PATH = process.env.TWIT_CASTING_USERIDS_PATH;

    const twcUserIdsSnap = await db.ref(TWC_USERIDS_PATH).get();
    if (twcUserIdsSnap.exists()) {
      const twcStreams = await twitCasting.getStreams(
        TWC_TOKEN,
        twcUserIdsSnap.val()
      );
      db.ref(`${DATA_URI}/twitCasting/streams`).set(twcStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twit casting userIds dont exist in rtdb"
      );
    }
  }
);
