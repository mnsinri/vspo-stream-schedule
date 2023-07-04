import React, { createContext, useMemo } from "react";
import { ChildrenNode, ChannelDTO, StreamDTO, StreamInfo } from "../../types";
import { useDB } from "../../hooks";
import { getFormattedDate, parseToJST } from "../../utils";

const DB_DATA_PATH = process.env.REACT_APP_DB_DATA_PATH;

export const VspoStreamingContext = createContext<StreamInfo[]>([]);

export const VspoStreamingProvider: React.FC<ChildrenNode> = ({ children }) => {
  const youtubeChannels = useDB<ChannelDTO>(
    `${DB_DATA_PATH}/youtube/channels`,
    24 * 60 * 60
  );

  const youtubeStreams = useDB<StreamDTO>(
    `${DB_DATA_PATH}/youtube/streams`,
    5 * 60
  );

  const twitchChannels = useDB<ChannelDTO>(
    `${DB_DATA_PATH}/twitch/channels`,
    24 * 60 * 60
  );

  const twitchStreams = useDB<StreamDTO>(
    `${DB_DATA_PATH}/twitch/streams`,
    5 * 60
  );

  const youtubeStreamsInfo = useMemo(
    () =>
      youtubeStreams.map((s) => {
        const ch = youtubeChannels.find((c) => c.id === s.channelId);

        if (ch === undefined) return {} as StreamInfo;

        return {
          id: s.id,
          title: s.title,
          thumbnail: s.thumbnail,
          url: s.url,
          startAt: s.startAt,
          scheduledDate: getFormattedDate(parseToJST(Date.parse(s.startAt))),
          service: "youtube",
          channelId: ch.id,
          name: ch.name,
          icon: ch.thumbnail,
        } as StreamInfo;
      }),
    [youtubeStreams]
  );

  const twitchStreamsInfo = useMemo(
    () =>
      twitchStreams.map((s) => {
        const ch = twitchChannels.find((c) => c.id === s.channelId);

        if (ch === undefined) return {} as StreamInfo;

        return {
          id: s.id,
          title: s.title,
          thumbnail: s.thumbnail,
          url: s.url,
          startAt: s.startAt,
          scheduledDate: getFormattedDate(parseToJST(Date.parse(s.startAt))),
          service: "twitch",
          channelId: ch.id,
          name: ch.name,
          icon: ch.thumbnail,
          gameName: s.gameName,
        } as StreamInfo;
      }),
    [twitchStreams]
  );

  return (
    <VspoStreamingContext.Provider
      value={[...youtubeStreamsInfo, ...twitchStreamsInfo]}
    >
      {children}
    </VspoStreamingContext.Provider>
  );
};
