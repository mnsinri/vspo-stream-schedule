import React, { createContext } from "react";
import { ChildrenNode, StreamInfo } from "../../types";
import { useStreamInfo } from "../../hooks";

export const VspoStreamingContext = createContext<StreamInfo[]>([]);

export const VspoStreamingProvider: React.FC<ChildrenNode> = ({ children }) => {
  const youtubeStreamsInfo = useStreamInfo("youtube");
  const twitchStreamsInfo = useStreamInfo("twitch");
  const twitCastingStreamsInfo = useStreamInfo("twitCasting");

  return (
    <VspoStreamingContext.Provider
      value={[
        ...youtubeStreamsInfo,
        ...twitchStreamsInfo,
        ...twitCastingStreamsInfo,
      ]}
    >
      {children}
    </VspoStreamingContext.Provider>
  );
};
