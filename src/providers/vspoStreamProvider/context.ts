import { createContext } from "react";
import { useStreamFilter } from "src/hooks";
import { Stream, Streamer } from "types";

export const vspoStreamContext = createContext<Stream[]>([]);
export const vspoStreamerContext = createContext<Streamer[]>([]);
export const vspoStreamFilterContext = createContext<
  Pick<ReturnType<typeof useStreamFilter>, "filter" | "streamerIds">
>(null!);
