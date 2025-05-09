import { type Stream } from "@types";
import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { useSettings } from "@/providers/setting";
import { useHover } from "@/hooks/useHover";

type StreamState = "upcoming" | "live" | "ended";

export function useStreamCard(stream: Stream) {
  const [streamState, setStreamState] = useState<StreamState>("upcoming");
  const { isMarqueeTitle } = useSettings();
  const { hovering, hoverParams } = useHover();

  const checkLiveState = (): StreamState => {
    const now = Date.now();
    const { endAt, startAt } = stream;

    if (endAt && endAt.getTime() <= now) return "ended";
    if (startAt.getTime() < now) return "live";
    return "upcoming";
  };
  useInterval(() => {
    const state = checkLiveState();
    if (streamState !== state) setStreamState(state);

    return state === "ended";
  }, 3000);

  const scheduledTimeHHMM =
    streamState === "live"
      ? "LIVE"
      : stream.startAt.toLocaleString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        });

  const speed = hovering ? 0.5 : 1;

  return {
    stream,
    streamState,
    scheduledTimeHHMM,
    isMarqueeTitle,
    hoverParams,
    speed,
  };
}
