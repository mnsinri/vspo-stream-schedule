import { cn } from "@/lib/utils";
import { Main } from "./main";
import { StreamerFilter } from "./streamerFilter";
import { useSettingMenu } from "../viewModel";

type Props = Omit<
  ReturnType<typeof useSettingMenu>,
  "isDesktop" | "open" | "setOpen" | "goBack"
> & { className?: string };

export function Content({
  className,
  tab,
  isInitialRender,
  selectStreamer,
  clearStreamer,
  ...props
}: Props) {
  const getContent = () => {
    if (tab === "main")
      return (
        <Main
          {...props}
          data-motion={!isInitialRender}
          className="data-[motion=true]:animate-enter-from-left"
        />
      );
    if (tab === "streamerFilter")
      return (
        <StreamerFilter
          ids={props.streamer.state}
          data-motion={!isInitialRender}
          className="data-[motion=true]:animate-enter-from-right"
          onClickIcon={selectStreamer}
          onClickClear={clearStreamer}
        />
      );
  };

  return (
    <div className={cn("w-full space-y-6", className)}>{getContent()}</div>
  );
}
