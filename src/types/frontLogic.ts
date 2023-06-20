export type ChannelDTO = {
  id: string;
  name: string;
  thumbnail: string;
  uploads: string;
  service: "youtube" | "twitch";
};

export type StreamDTO = {
  channelId: string;
  id: string;
  title: string;
  thumbnail: string;
  scheduledStartTime: string;
  service: "youtube" | "twitch";
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
  scheduledStartTime: string;
  service: "youtube" | "twitch";
  channelId: string;
  name: string;
  icon: string;
};
