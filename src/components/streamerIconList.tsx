import { Streamer } from "@types";
import { ReactNode } from "react";
import { Setting } from "@/providers/setting";
import { useVspoStreamer } from "@/providers/vspoStream";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  ids?: Setting["filteredStreamerIds"] | "[all]";
  renderIcon?: (v: Streamer, i: number, arr: Streamer[]) => ReactNode;
  className?: string;
  children?: ReactNode;
};

export function StreamerIconList({
  ids = "[all]",
  renderIcon = (s) => (
    <Avatar key={s.id}>
      <AvatarImage src={s.youtube.icon} />
    </Avatar>
  ),
  className,
  children,
}: Props) {
  const streamers = useVspoStreamer();

  const targets =
    ids === "[all]"
      ? [...streamers].sort((a, b) => a.order - b.order)
      : ids.map((id) => streamers.find((s) => s.id === id)!);

  return (
    <div className={className}>
      {targets.map(renderIcon)}
      {children}
    </div>
  );
}
