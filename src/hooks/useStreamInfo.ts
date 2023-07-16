import { useDB } from "./useDB";
import { ChannelDTO, StreamDTO, StreamInfo, Service } from "../types";
import { getFormattedDate, parseToJST } from "../utils";
import { useMemo } from "react";

const DB_DATA_PATH = process.env.REACT_APP_DB_DATA_PATH;

export const useStreamInfo = (
  service: Service,
  channelCacheAvailableTime = 24 * 60 * 60, //sec
  streamCacheAvailableTime = 5 * 60 //sec
): StreamInfo[] => {
  const channels = useDB<ChannelDTO>(
    `${DB_DATA_PATH}/${service}/channels`,
    channelCacheAvailableTime
  );

  const streams = useDB<StreamDTO>(
    `${DB_DATA_PATH}/${service}/streams`,
    streamCacheAvailableTime
  );

  const streamsInfo = useMemo(
    () =>
      streams.reduce<StreamInfo[]>((state, s) => {
        const ch = channels.find((c) => c.id === s.channelId);

        if (ch !== undefined) {
          state.push({
            id: s.id,
            title: s.title,
            thumbnail: s.thumbnail,
            url: s.url,
            startAt: s.startAt,
            scheduledDate: getFormattedDate(parseToJST(Date.parse(s.startAt))),
            channelId: ch.id,
            name: ch.name,
            icon: ch.thumbnail,
            gameName: s.gameName,
            service,
          });
        }

        return state;
      }, []),
    [streams]
  );

  return streamsInfo;
};
