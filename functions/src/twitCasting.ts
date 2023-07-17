import axios from "axios";
import { ChannelInfo, StreamInfo } from "./types";

const baseURL = "https://apiv2.twitcasting.tv";

const doGetRequestTwitCasting = async (url: string, token: string) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-Api-Version": "2.0",
      },
    });

    return res.data;
  } catch (e) {
    return null;
  }
};

export const getChannels = async (token: string, userIds: string[]) => {
  const buildUrl = (userId: string) => `${baseURL}/users/${userId}`;

  const requests = userIds.map((id) =>
    doGetRequestTwitCasting(buildUrl(id), token)
  );

  const contents: { user: any }[] = (await Promise.all(requests)).filter(
    (v) => v
  );

  return contents.map<ChannelInfo>((co) => ({
    id: co.user.id,
    name: co.user.name,
    thumbnail: co.user.image,
  }));
};

export const getStreams = async (token: string, userIds: string[]) => {
  const buildUrl = (userId: string) =>
    `${baseURL}/users/${userId}/current_live`;

  const requests = userIds.map((id) =>
    doGetRequestTwitCasting(buildUrl(id), token)
  );

  const contents: { movie: any }[] = (await Promise.all(requests)).filter(
    (v) => v && !v.movie.is_protected
  );

  return contents.map<StreamInfo>((co) => ({
    channelId: co.movie.user_id,
    id: co.movie.id,
    title: co.movie.title,
    thumbnail: co.movie.large_thumbnail,
    url: co.movie.link,
    startAt: new Date(co.movie.created * 1000).toISOString(),
  }));
};
