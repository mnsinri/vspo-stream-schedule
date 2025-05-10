import { InView } from "react-intersection-observer";
import { DailyStream } from "@types";
import { DateLabel } from "../dateLabel";
import { DummyStreamCard, StreamCard } from "../streamCard";
import { useStreamGirdList } from "./viewModel";

function DailyStreamGrid({ date, streams }: DailyStream) {
  return (
    <>
      <DateLabel dateString={date} />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {streams.map((stream) => (
          <InView key={stream.id}>
            {({ ref, inView }) => (
              <div ref={ref} className="flex justify-center">
                {inView ? <StreamCard stream={stream} /> : <DummyStreamCard />}
              </div>
            )}
          </InView>
        ))}
      </div>
    </>
  );
}

export function StreamGridList() {
  const { dailyStreams } = useStreamGirdList();

  return (
    <div className="px-5 lg:px-15 pb-8">
      {dailyStreams.map(({ date, streams }) => (
        <InView key={date}>
          {({ ref, inView }) => (
            <div ref={ref}>
              {inView && <DailyStreamGrid date={date} streams={streams} />}
            </div>
          )}
        </InView>
      ))}
    </div>
  );
}
