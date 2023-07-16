import axios from "axios";
import { ChannelInfo, StreamInfo } from "./types";

const baseURL = "https://api.twitch.tv/helix";

const doGetRequestTwitch = async (
  url: string,
  token: string,
  clientId: string
) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": clientId,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (e) {
    return { data: [] };
  }
};

export const getChannels = async (
  token: string,
  clientId: string,
  channelIds: string[]
) => {
  const url = `${baseURL}/users?${channelIds
    .map((ch) => `login=${ch}`)
    .join("&")}`;

  const contents: { data: any[] } = await doGetRequestTwitch(
    url,
    token,
    clientId
  );

  return contents.data.map(
    (v): ChannelInfo => ({
      id: v.id,
      name: v.display_name,
      thumbnail: v.profile_image_url,
    })
  );
};

export const getStreams = async (
  token: string,
  clientId: string,
  channelIds: string[]
) => {
  const url = `${baseURL}/streams?first=50&${channelIds
    .map((ch) => `user_login=${ch}`)
    .join("&")}`;

  const contents: { data: any[] } = await doGetRequestTwitch(
    url,
    token,
    clientId
  );

  return contents.data.map(
    (v): StreamInfo => ({
      id: v.id,
      channelId: v.user_id,
      title: v.title,
      thumbnail: v.thumbnail_url
        .replace("{width}", "320")
        .replace("{height}", "180"),
      url: `https://www.twitch.tv/${v.user_login}`,
      startAt: v.started_at,
      gameName: v.game_name,
    })
  );
};
