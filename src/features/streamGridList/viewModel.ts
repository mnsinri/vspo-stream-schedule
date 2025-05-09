import { type Stream } from "@types";
import { useVspoStream } from "@/providers/vspoStream";
import { toYYYYMMDD } from "@/lib/utils";
import { useMemo } from "react";
import { useSettings } from "@/providers/setting";

type DailyStream = {
  date: string;
  streams: Stream[];
};

function sortStreams(streams: Stream[]) {
  return [...streams].sort(
    (a, b) =>
      b.startAt.getTime() - a.startAt.getTime() ||
      a.streamerName.localeCompare(b.streamerName)
  );
}

export function useStreamGirdList() {
  const streams = useVspoStream();
  const { isDisplayHistory } = useSettings();

  const dailyStreams: DailyStream[] = useMemo(() => {
    const now = Date.now();
    const isEndedStream = (s: Stream) => s.endAt && s.endAt.getTime() <= now;

    const dailyStreamObj = streams.reduce(
      (result: Record<string, Stream[]>, stream) => {
        if (!isDisplayHistory && isEndedStream(stream)) return result;

        const dateStr = toYYYYMMDD(stream.startAt);

        if (result[dateStr]) result[dateStr].push(stream);
        else result[dateStr] = [stream];

        return result;
      },
      {}
    );

    return Object.entries(dailyStreamObj)
      .sort((a, b) => (a[0] > b[0] ? -1 : 1))
      .map(([date, streams]) => ({ date, streams: sortStreams(streams) }));
  }, [streams, isDisplayHistory]);

  return { dailyStreams };
}
