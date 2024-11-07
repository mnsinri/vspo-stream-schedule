export { Config } from "./config";

export type Platform = "youtube" | "twitch" | "twitCasting";

export type Channel = {
  id: string;
  name: string;
  icon: string;
  platform: Platform;
};

export type Streamer = { [k in Platform]: Channel } & { order: number };

export type BaseStream = {
  id: string;
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

export type Stream = BaseStream & {
  streamerId: string;
};
