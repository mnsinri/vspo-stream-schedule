import * as logger from "firebase-functions/logger";
import { google, youtube_v3 } from "googleapis";
import { YOUTUBE_CHANNEL_IDS } from "./vspo";

export type ChannelInfo = {
  id: string;
  name: string;
  thumbnail: string;
  uploads: string;
};

type VideoInfo = {
  channelId: string;
  id: string;
  title: string;
  thumbnail: string;
};

type LiveInfo = {
  id: string;
  scheduledStartTime: string;
};

export type StreamingInfo = VideoInfo & LiveInfo;

//ChannelIdの2文字目を'U'にするとそのチャンネルのuploadedPlaylistIdになる
const getPlaylistIds = () => {
  return YOUTUBE_CHANNEL_IDS.map((id) => id.replace(/(?<=^.{1})./, "U"));
};

export const getStreamings = async (apiKey: string) => {
  const playlistIds = getPlaylistIds();
  const maxResult = 10;

  //get uploaded video info
  const plRequests = [];
  for (const id of playlistIds) {
    plRequests.push(
      google.youtube("v3").playlistItems.list({
        key: apiKey,
        part: ["snippet"],
        playlistId: id,
        maxResults: maxResult,
      })
    );
  }

  const plResponses = await Promise.all(plRequests);
  const uploads = plResponses
    .filter((res) => 200 <= res.status && res.status < 300)
    .map(
      (res) =>
        res.data.items?.map((item) => {
          return {
            channelId: item.snippet?.channelId,
            id: item.snippet?.resourceId?.videoId,
            title: item.snippet?.title,
            thumbnail: item.snippet?.thumbnails?.medium?.url,
          } as VideoInfo;
        }) ?? []
    )
    .flat();

  //get streaming info
  const vRequests = [];
  for (var i = 0; i < playlistIds.length * maxResult; i += 50) {
    vRequests.push(
      google.youtube("v3").videos.list({
        key: apiKey,
        part: ["liveStreamingDetails"],
        id: uploads.slice(i, i + 50).map((v) => v.id),
        maxResults: 50,
      })
    );
  }

  const vResponses = await Promise.all(vRequests);
  const toStreamInfo = (vi: youtube_v3.Schema$Video) => {
    return vi.liveStreamingDetails?.scheduledStartTime
      ? ({
          id: vi.id,
          scheduledStartTime: vi.liveStreamingDetails?.scheduledStartTime,
        } as LiveInfo)
      : ({} as LiveInfo);
  };
  const streamingVideos = vResponses
    .filter((res) => 200 <= res.status && res.status < 300)
    .map((res) => {
      return (
        res.data.items
          ?.filter((vi) => vi.liveStreamingDetails?.activeLiveChatId != null)
          .map(toStreamInfo) ?? []
      );
    })
    .flat();

  return streamingVideos.map((li) => {
    return { ...li, ...uploads.find((vi) => vi.id === li.id) } as StreamingInfo;
  });
};

export const getChannels = async (apiKey: string) => {
  const res = await google.youtube("v3").channels.list({
    key: apiKey,
    part: ["snippet", "contentDetails"],
    id: YOUTUBE_CHANNEL_IDS,
  });

  if (res.status < 200 && 299 < res.status) {
    logger.error(
      "The Channels:list API returned an error: status=" + res.status
    );
    return [];
  }

  if (res.data.items === undefined || res.data.items.length == 0) {
    logger.error("No channel found.");
    return [];
  }

  return res.data.items.map((item) => {
    return {
      id: item.id,
      name: item.snippet?.title,
      thumbnail: item.snippet?.thumbnails?.default?.url,
      uploads: item.contentDetails?.relatedPlaylists?.uploads,
    } as ChannelInfo;
  });
};
