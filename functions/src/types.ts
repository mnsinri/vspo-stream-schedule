export type ChannelInfo = {
  id: string;
  name: string;
  thumbnail: string;
  uploads?: string;
};

export type VideoInfo = {
  channelId: string;
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  gameName?: string;
};

export type LiveInfo = {
  id: string;
  startAt: string;
};

export type StreamInfo = VideoInfo & LiveInfo;

export type functionCache = {
  youtubeChannelIds: string[];
  twitchChennelIds: string[];
};
