import * as logger from "firebase-functions/logger";
import axios from "axios";

export type ChannelInfo = {
  id: string;
  name: string;
  icon: string;
};

export type StreamInfo = {
  id: string;
  userId: string;
  startedAt: string;
  title: string;
  thumbnail: string;
  gameName: string;
  url: string;
};

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
    icon: v.profile_image_url,
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
    userId: v.user_id,
    startedAt: v.started_at,
    title: v.title,
    thumbnail: v.thumbnail_url,
    gameName: v.game_name,
    url: `https://www.twitch.tv/${v.user_login}`,
  }));
};
