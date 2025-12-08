import {
  Channel,
  ChannelResponse,
  Stream,
  Streamer,
  StreamerMap,
  StreamerResponse,
  StreamResponse,
} from "@types";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebase";
import { vspoStreamContext, vspoStreamerContext } from "./context";
import { useSettings } from "../setting";
import { mockStreamers, mockStreams } from "@/mocks";

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

const parseToStreamer = (
  id: string,
  streamerRes: StreamerResponse
): Streamer => {
  const entries = Object.entries(streamerRes).map(([key, data]) => {
    if (key === "order") return [key, data];

    const { id, name, icon } = data as ChannelResponse;
    return [key, { id, name, icon }];
  });

  return Object.fromEntries(entries.concat([["id", id]]));
};

export const VspoStreamProvider = ({ children }: { children: ReactNode }) => {
  const [streamResponses, setStreamsResponse] = useState<StreamResponse[]>([]);
  const [streamerMap, setStreamerMap] = useState<StreamerMap>({});
  const { filteredStreamerIds, filteredTitle } = useSettings();

  useEffect(() => {
    const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

    if (useMockData) {
      // Use mock data for local development
      console.log("Using mock data for local development");
      setStreamsResponse(mockStreams);
      
      const map = Object.fromEntries(
        Object.entries(mockStreamers).map(([id, data]) => [
          id,
          parseToStreamer(id, data),
        ])
      );
      setStreamerMap(map);
      return;
    }

    // Use Firebase for production
    const streamCollectionName = import.meta.env.VITE_STREAM_COLLECTION_NAME;
    const streamerCollectionName = import.meta.env
      .VITE_STREAMER_COLLECTION_NAME;

    if (!streamCollectionName || !streamerCollectionName) {
      throw new Error(
        "Environment variable not found: VITE_STREAM_COLLECTION_NAME, VITE_STREAMER_COLLECTION_NAME"
      );
    }

    const unSubStream = onSnapshot(
      collection(firestore, streamCollectionName),
      (snapshot) => {
        const newStreams = snapshot.docs.map(
          (doc) => doc.data() as StreamResponse
        );
        setStreamsResponse((prev) => {
          return [
            ...newStreams,
            ...prev.filter((s) => !newStreams.some(({ id }) => id === s.id)),
          ];
        });
      }
    );

    const unSubStreamer = onSnapshot(
      collection(firestore, streamerCollectionName),
      (snapshot) => {
        const map = Object.fromEntries(
          snapshot.docs.map((doc) => {
            return [
              doc.id,
              parseToStreamer(doc.id, doc.data() as StreamerResponse),
            ];
          })
        );
        setStreamerMap(map);
      }
    );

    return () => {
      unSubStreamer();
      unSubStream();
    };
  }, []);

  const streams = useMemo<Stream[]>(() => {
    const titleFilterLower = filteredTitle.trim().toLowerCase();
    
    return streamResponses.reduce((results: Stream[], streamRes) => {
      const channel = streamerMap[streamRes.streamerId][streamRes.platform];

      if (!channel) {
        console.error(`streamerId is not found: ${streamRes.streamerId}`);
        return results;
      }

      // filter対象外
      if (
        filteredStreamerIds.length !== 0 &&
        !filteredStreamerIds.includes(streamRes.streamerId)
      ) {
        return results;
      }

      // filter by title
      if (
        titleFilterLower !== "" &&
        !streamRes.title.toLowerCase().includes(titleFilterLower)
      ) {
        return results;
      }

      return results.concat(parseToStream(streamRes, channel));
    }, []);
  }, [streamResponses, streamerMap, filteredStreamerIds, filteredTitle]);

  const streamers = useMemo<Streamer[]>(
    () => Object.values(streamerMap),
    [streamerMap]
  );

  return (
    <vspoStreamContext.Provider value={streams}>
      <vspoStreamerContext.Provider value={streamers}>
        {children}
      </vspoStreamerContext.Provider>
    </vspoStreamContext.Provider>
  );
};
