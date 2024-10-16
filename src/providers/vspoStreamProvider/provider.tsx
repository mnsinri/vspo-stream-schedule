import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "src/Firebase";
import {
  vspoStreamContext,
  vspoStreamerContext,
  vspoStreamFilterContext,
} from "./context";
import {
  Channel,
  Stream,
  Streamer,
  StreamerMap,
  StreamerResponse,
  StreamResponse,
} from "types";
import { useStreamFilter } from "src/hooks";

type Props = {
  children: ReactNode;
};

const parseToStream = (streamRes: StreamResponse, channel: Channel): Stream => {
  const endAt = streamRes.endTime ? new Date(streamRes.endTime) : undefined;

  return {
    id: streamRes.id,
    title: streamRes.title,
    thumbnail: streamRes.thumbnail,
    url: streamRes.url,
    streamerId: streamRes.streamerId,
    streamerName: channel.name,
    icon: channel.icon,
    platform: streamRes.platform,
    startAt: new Date(streamRes.scheduledStartTime),
    endAt,
  };
};

const parseToStreamer = (streamerRes: StreamerResponse): Streamer => {
  const entries = Object.entries(streamerRes).map(
    ([key, { id, name, icon }]) => [key, { id, name, icon }],
  );

  return Object.fromEntries(entries);
};

export const VspoStreamProvider = ({ children }: Props) => {
  const [streamResponses, setStreamsResponse] = useState<StreamResponse[]>([]);
  const [streamerMap, setStreamerMap] = useState<StreamerMap>({});

  useEffect(() => {
    const streamCollectionName = process.env.REACT_APP_STREAM_COLLECTION_NAME;
    const streamerCollectionName =
      process.env.REACT_APP_STREAMER_COLLECTION_NAME;

    if (!streamCollectionName || !streamerCollectionName) {
      throw new Error(
        "Environment variable not found: REACT_APP_STREAM_COLLECTION_NAME, REACT_APP_STREAMER_COLLECTION_NAME",
      );
    }

    const unSubStream = onSnapshot(
      collection(firestore, streamCollectionName),
      (snapshot) => {
        setStreamsResponse((prev) => {
          const newStreams = snapshot.docs.map(
            (doc) => doc.data() as StreamResponse,
          );
          return [
            ...newStreams,
            ...prev.filter((s) => !newStreams.some(({ id }) => id === s.id)),
          ];
        });
      },
    );

    const unSubStreamer = onSnapshot(
      collection(firestore, streamerCollectionName),
      (snapshot) => {
        const map = Object.fromEntries(
          snapshot.docs.map((doc) => {
            return [doc.id, parseToStreamer(doc.data() as StreamerResponse)];
          }),
        );
        setStreamerMap(map);
      },
    );

    return () => {
      unSubStreamer();
      unSubStream();
    };
  }, []);

  const streams = useMemo<Stream[]>(() => {
    console.log("update streams");
    return streamResponses.reduce((results: Stream[], streamRes) => {
      const channel = streamerMap[streamRes.streamerId][streamRes.platform];

      if (!channel) {
        console.error(`streamerId is not found: ${streamRes.streamerId}`);
        return results;
      }

      return results.concat(parseToStream(streamRes, channel));
    }, []);
  }, [streamResponses, streamerMap]);

  const { filteredStreams, ...filterContext } = useStreamFilter(streams);

  const streamers = useMemo<Streamer[]>(() => {
    return Object.entries(streamerMap).map(([id, channels]) => ({
      ...channels,
      id,
    }));
  }, [streamerMap]);

  return (
    <vspoStreamFilterContext.Provider value={filterContext}>
      <vspoStreamContext.Provider value={filteredStreams}>
        <vspoStreamerContext.Provider value={streamers}>
          {children}
        </vspoStreamerContext.Provider>
      </vspoStreamContext.Provider>
    </vspoStreamFilterContext.Provider>
  );
};
