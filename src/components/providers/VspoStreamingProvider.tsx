import React, { createContext, useEffect, useState } from "react";
import { ChildrenNode, ChannelDTO, StreamDTO, StreamInfo } from "../../types";
import { useDB } from "../../hooks";

const DATA_PATH = process.env.REACT_APP_DATA_PATH;

export const VspoStreamingContext = createContext<StreamInfo[]>([]);

export const VspoStreamingProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [ytStreams, setYtStreams] = useState<StreamInfo[]>([]);

  const youtubeChannels = useDB<ChannelDTO>(
    `${DATA_PATH}/youtube/channels`,
    24 * 60 * 60,
    (v) => {
      v.service = "youtube";
      return v;
    }
  );

  const youtubeStreams = useDB<StreamDTO>(
    `${DATA_PATH}/youtube/streams`,
    5 * 60,
    (v) => {
      v.service = "youtube";
      return v;
    }
  );

  useEffect(() => {
    const streams = youtubeStreams.map((s) => {
      const ch = youtubeChannels.find((c) => c.id === s.channelId);

      if (ch === undefined) return {} as StreamInfo;

      return {
        id: s.id,
        title: s.title,
        thumbnail: s.thumbnail,
        scheduledStartTime: s.scheduledStartTime,
        service: s.service,
        channelId: ch.id,
        name: ch.name,
        icon: ch.thumbnail,
      };
    });
    setYtStreams(streams);
  }, [youtubeStreams]);

  return (
    <VspoStreamingContext.Provider value={[...ytStreams]}>
      {children}
    </VspoStreamingContext.Provider>
  );
};
