export type Services = {
  service: "youtube" | "twitch";
};

export type ChannelDTO = {
  id: string;
  name: string;
  thumbnail: string;
  uploads?: string;
};

export type StreamDTO = {
  channelId: string;
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  startAt: string;
  gameName?: string;
};

export type ChannelCache = {
  channels: ChannelDTO[];
  timestamp: string;
};

export type StreamingCache = {
  streams: StreamDTO[];
  timestamp: string;
};

export type ChildrenNode = {
  children: React.ReactNode;
};

export type StreamInfo = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  startAt: string;
  scheduledDate: string;
  channelId: string;
  name: string;
  icon: string;
  gameName?: string;
} & Services;
