import { cn } from "@/lib/utils";
import { Main } from "./main";
import { StreamerFilter } from "./streamerFilter";
import { useSettingMenu } from "../viewModel";

type Props = Omit<
  ReturnType<typeof useSettingMenu>,
  "isDesktop" | "open" | "setOpen"
> & { className?: string };

export function Contents({
  className,
  tab,
  goBack,
  selectStreamer,
  clearStreamer,
  ...props
}: Props) {
  const getContents = () => {
    if (tab === "main")
      return (
        <Main
          {...props}
          data-motion={!props.isInitialRender}
          className="data-[motion=true]:animate-enter-from-left"
        />
      );
    if (tab === "streamerFilter")
      return (
        <StreamerFilter
          ids={props.streamer.state}
          onClickBack={goBack}
          onClickIcon={selectStreamer}
          onClickClear={clearStreamer}
          className="animate-enter-from-right"
        />
      );
  };

  return (
    <div className={cn("w-full space-y-6", className)}>{getContents()}</div>
  );
}
