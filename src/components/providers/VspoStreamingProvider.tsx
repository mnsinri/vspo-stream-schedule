import React, { createContext } from "react";
import {
  ChannelInfo,
  ChildrenNode,
  StreamingInfo,
  VspoStreams,
} from "../../types";
import { useDB } from "../../hooks";

export const VspoStreamingContext = createContext<VspoStreams>(
  {} as VspoStreams
);

export const VspoStreamingProvider: React.FC<ChildrenNode> = ({ children }) => {
  const youtubeChannels = useDB<ChannelInfo>("/channels/youtube", 3600, (v) => {
    v.service = "youtube";
    return v;
  });

  const youtubeStreams = useDB<StreamingInfo>("/streams/youtube", 300, (v) => {
    v.service = "youtube";
    return v;
  });

  youtubeStreams.push({
    channelId: "UCyLGcqYs7RsBb3L0SJfzGYA",
    id: "zDZMvolfkps",
    scheduledStartTime: "2023-06-16T10:00:00Z",
    thumbnail: "https://i.ytimg.com/vi/zDZMvolfkps/mqdefault_live.jpg",
    title: "【BLUEPROTOCOL】一筋の光【 ぶいすぽ  / 花芽すみれ 】",
    service: "youtube",
  });

  const streams = {
    streams: {
      youtube: youtubeStreams,
    },
    channels: {
      youtube: youtubeChannels,
    },
  };

  return (
    <VspoStreamingContext.Provider value={streams}>
      {children}
    </VspoStreamingContext.Provider>
  );
};
