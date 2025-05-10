export type Platform = "youtube" | "twitch" | "twitCasting";

export type ChannelResponse = {
  id: string;
  name: string;
  icon: string;
  platform: Platform;
};

export type StreamerResponse = { [k in Platform]: ChannelResponse } & {
  order: number;
};

export type StreamResponse = {
  id: string;
  streamerId: string;
  channelId: string;
  platform: Platform;
  title: string;
  thumbnail: string;
  url: string;
  scheduledStartTime: string; // date string
  startTime?: string; // date string
  endTime?: string; // date string
  ttl: Date;
};

export type Channel = {
  id: string;
  name: string;
  icon: string;
};

export type Streamer = { [key in Platform]: Channel } & {
  id: string;
  order: number;
};

export type StreamerMap = { [id in string]: Streamer };

export type Stream = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  streamerId: string;
  streamerName: Channel["name"];
  icon: Channel["icon"];
  platform: Platform;
  startAt: Date;
  endAt?: Date;
};

export type DailyStream = {
  date: string;
  streams: Stream[];
};
