import * as youtube from "./youtube";
import * as twitch from "./twitch";
import * as twitCasting from "./twitCasting";
import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { getDatabase } from "firebase-admin/database";

const db = getDatabase();

export const getVspoYoutube = onRequest(
  { secrets: ["YOUTUBE_API"] },
  async (req, res) => {
    const YT_CHANNELIDS_PATH = process.env.YOUTUBE_CHANNELIDS_PATH;
    const YT_API_KEY = process.env.YOUTUBE_API;

    const ytChSnap = await db.ref(YT_CHANNELIDS_PATH).get();
    if (ytChSnap.exists()) {
      const ytStreams = await youtube.getStreams(YT_API_KEY, ytChSnap.val());
      res.send(ytStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] youtube channels dont exist in rtdb"
      );
      res.send({});
    }
  }
);

export const getVspoTwitch = onRequest(
  { secrets: ["TWITCH_TOKEN", "TWITCH_CLIENT_ID"] },
  async (req, res) => {
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
      res.send(twStreams);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twitch channels dont exist in rtdb"
      );
      res.send({});
    }
  }
);

export const getVspoTwitCasting = onRequest(
  { secrets: ["TWIT_CASTING_TOKEN"] },
  async (req, res) => {
    const TWC_TOKEN = process.env.TWIT_CASTING_TOKEN;
    const TWC_USERIDS_PATH = process.env.TWIT_CASTING_USERIDS_PATH;

    const twcUserIdsSnap = await db.ref(TWC_USERIDS_PATH).get();
    if (twcUserIdsSnap.exists()) {
      const data = await twitCasting.getStreams(
        TWC_TOKEN,
        twcUserIdsSnap.val()
      );
      res.send(data);
    } else {
      logger.error(
        "[vspo-stream-schedule:updateStreams] twit casting userIds dont exist in rtdb"
      );
      res.send({});
    }
  }
);
