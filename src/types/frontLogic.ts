export type ChannelInfo = {
  id: string;
  name: string;
  thumbnail: string;
  uploads: string;
  service: "youtube" | "twitch";
};

export type StreamingInfo = {
  channelId: string;
  id: string;
  title: string;
  thumbnail: string;
  scheduledStartTime: string;
  service: "youtube" | "twitch";
};

export type ChannelCache = {
  channels: ChannelInfo[];
  timestamp: string;
};

export type StreamingCache = {
  streams: StreamingInfo[];
  timestamp: string;
};

export type ChildrenNode = {
  children: React.ReactNode;
};

export type VspoStreams = {
  streams: {
    youtube: StreamingInfo[];
  };
  channels: {
    youtube: ChannelInfo[];
  };
};
