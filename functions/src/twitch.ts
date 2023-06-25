import * as logger from "firebase-functions/logger";
import axios from "axios";
import { ChannelInfo, StreamInfo } from "./types";

const usersURL = "https://api.twitch.tv/helix/users";
const streamsURL = "https://api.twitch.tv/helix/streams";

const requestGetTwitchApi = async <T>(
  url: string,
  token: string,
  clientId: string,
  parser: (v: any) => T
) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": clientId,
      "Content-Type": "application/json",
    },
  });

  if (res.status < 200 || 300 <= res.status) {
    logger.error("[Twitch] request error in getChannels: status=" + res.status);
    return [];
  }

  const resData = JSON.parse(JSON.stringify(res.data)) as { data: any[] };

  return resData.data.map(parser);
};

export const getChannels = async (
  token: string,
  clientId: string,
  channelIds: string[]
) => {
  const url = `${usersURL}?${channelIds.map((ch) => `login=${ch}`).join("&")}`;

  return await requestGetTwitchApi<ChannelInfo>(url, token, clientId, (v) => ({
    id: v.id,
    name: v.display_name,
    thumbnail: v.profile_image_url,
  }));
};

export const getStreams = async (
  token: string,
  clientId: string,
  channelIds: string[]
) => {
  const url = `${streamsURL}?first=50&${channelIds
    .map((ch) => `user_login=${ch}`)
    .join("&")}`;

  return await requestGetTwitchApi<StreamInfo>(url, token, clientId, (v) => ({
    id: v.id,
    channelId: v.user_id,
    title: v.title,
    thumbnail: v.thumbnail_url
      .replace("{width}", "320")
      .replace("{height}", "180"),
    url: `https://www.twitch.tv/${v.user_login}`,
    startAt: v.started_at,
    gameName: v.game_name,
  }));
};
