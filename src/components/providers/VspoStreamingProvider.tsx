import React, { createContext, useMemo } from "react";
import {
  ChildrenNode,
  ChannelDTO,
  StreamDTO,
  StreamInfo,
  VspoStreams,
} from "../../types";
import { useDB } from "../../hooks";

export const VspoStreamingContext = createContext<VspoStreams>(
  {} as VspoStreams
);

export const VspoStreamingProvider: React.FC<ChildrenNode> = ({ children }) => {
  const youtubeChannels = useDB<ChannelDTO>("/channels/youtube", 3600, (v) => {
    v.service = "youtube";
    return v;
  });

  const youtubeStreams = useDB<StreamDTO>("/streams/youtube", 300, (v) => {
    v.service = "youtube";
    return v;
  });

  const streams = useMemo(
    () =>
      youtubeStreams.reduce((streams: StreamInfo[], st: StreamDTO) => {
        const ch = youtubeChannels.find((c) => c.id === st.channelId);

        if (ch !== undefined) {
          streams.push({
            id: st.id,
            title: st.title,
            thumbnail: st.thumbnail,
            scheduledStartTime: st.scheduledStartTime,
            service: st.service,
            channelId: ch.id,
            name: ch.name,
            icon: ch.thumbnail,
          });
        }

        return streams;
      }, []),
    [youtubeStreams]
  );

  return (
    <VspoStreamingContext.Provider value={{ youtube: streams }}>
      {children}
    </VspoStreamingContext.Provider>
  );
};
