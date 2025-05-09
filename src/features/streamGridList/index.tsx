import { DateLabel } from "../dateLabel";
import { StreamCard } from "../streamCard";
import { useStreamGirdList } from "./viewModel";

export function StreamGridList() {
  const { dailyStreams } = useStreamGirdList();

  return (
    <div className="px-5 lg:px-15">
      {dailyStreams.map(({ date, streams }) => (
        <div key={date}>
          <DateLabel dateString={date} />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
            {streams.map((stream) => (
              <div key={stream.id} className="flex justify-center">
                <StreamCard key={stream.id} stream={stream} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
