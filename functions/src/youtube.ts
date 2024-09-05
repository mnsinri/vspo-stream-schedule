import { google, youtube_v3 } from "googleapis";
import { ChannelInfo, StreamInfo, VideoInfo, LiveInfo } from "./types";

export const getChannels = async (apiKey: string, channelIds: string[]) => {
  const res = await google.youtube("v3").channels.list({
    key: apiKey,
    part: ["snippet", "contentDetails"],
    id: channelIds,
  });

  if (res.status < 200 && 300 <= res.status) {
    return [];
  }

  return (
    res.data.items?.map(
      (item: youtube_v3.Schema$Channel): ChannelInfo => ({
        id: item.id ?? "",
        name: item.snippet?.title ?? "",
        thumbnail: item.snippet?.thumbnails?.default?.url ?? "",
        uploads: item.contentDetails?.relatedPlaylists?.uploads,
      })
    ) ?? []
  );
};

//ChannelIdの2文字目を'U'にするとそのチャンネルのuploadedPlaylistIdになる
const getPlaylistIds = (channelIds: string[]) => {
  return channelIds.map((id) => id.replace(/(?<=^.{1})./, "U"));
};

export const getStreams = async (
  apiKey: string,
  channelIds: string[],
  searchVideoNum: number = 10
) => {
  const playlistIds = getPlaylistIds(channelIds);

  //get uploaded video info
  const plRequests = playlistIds.map((id) =>
    google.youtube("v3").playlistItems.list({
      key: apiKey,
      part: ["snippet"],
      playlistId: id,
      maxResults: searchVideoNum,
    })
  );
  const plResponses = await Promise.all(plRequests);

  const uploads = plResponses
    .filter((res) => 200 <= res.status && res.status < 300)
    .map(
      (res) =>
        res.data.items?.map(
          (item): VideoInfo => ({
            channelId: item.snippet?.channelId ?? "",
            id: item.snippet?.resourceId?.videoId ?? "",
            title: item.snippet?.title ?? "",
            thumbnail: item.snippet?.thumbnails?.medium?.url ?? "",
            url: `https://www.youtube.com/watch?v=${item.snippet?.resourceId?.videoId}`,
          })
        ) ?? []
    )
    .flat();

  //get streaming info
  const maxResults = 50;
  const vRequests = Array.from(
    { length: Math.ceil(uploads.length / maxResults) },
    (_, i) =>
      google.youtube("v3").videos.list({
        key: apiKey,
        part: ["liveStreamingDetails"],
        id: uploads
          .slice(i * maxResults, (i + 1) * maxResults)
          .map((v) => v.id),
        maxResults,
      })
  );
  const vResponses = await Promise.all(vRequests);

  const predicate = (vi: youtube_v3.Schema$Video) =>
    vi.liveStreamingDetails?.activeLiveChatId != null &&
    vi.liveStreamingDetails?.scheduledStartTime != null;
  const convertLiveInfo = (vi: youtube_v3.Schema$Video): LiveInfo => ({
    id: vi.id ?? "",
    startAt: vi.liveStreamingDetails?.scheduledStartTime ?? "",
  });
  const streamingVideos = vResponses
    .filter((res) => 200 <= res.status && res.status < 300)
    .map((res) => res.data.items?.filter(predicate).map(convertLiveInfo) ?? [])
    .flat();

  return streamingVideos
    .map((liveInfo): StreamInfo | null => {
      const videoInfo = uploads.find((vi) => vi.id === liveInfo.id);

      if (videoInfo === undefined) return null;

      return { ...videoInfo, ...liveInfo };
    })
    .filter((st) => st);
};
