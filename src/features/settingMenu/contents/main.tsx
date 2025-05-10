import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
  SwitchItem,
  EntryItem,
  SelectItem,
  Header,
} from "@/components/settingItem";
import { Setting } from "@/providers/setting";
import { StreamerIconList } from "@/components/streamerIconList";

type MainProps = {
  theme: {
    state: Setting["theme"];
    options: Setting["theme"][];
    onSelect: (v: Setting["theme"]) => void;
  };
  isMarqueeTitle: {
    state: Setting["isMarqueeTitle"];
    onChange: (v: Setting["isMarqueeTitle"]) => void;
  };
  isDisplayHistory: {
    state: Setting["isDisplayHistory"];
    onChange: (v: Setting["isDisplayHistory"]) => void;
  };
  streamer: {
    state: Setting["filteredStreamerIds"];
    onClickTrigger: () => void;
  };
};

export function Main({
  className,
  theme,
  isMarqueeTitle,
  isDisplayHistory,
  streamer,
  ...props
}: ComponentProps<"div"> & MainProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Header>Settings</Header>
      <div>
        <SelectItem
          label="Theme"
          value={theme.state}
          values={theme.options}
          onValueChange={theme.onSelect}
          className="rounded-t-xl border-b"
        />
        <SwitchItem
          label="Marquee"
          description="Make a marquee on the stream title"
          checked={isMarqueeTitle.state}
          onCheckedChange={isMarqueeTitle.onChange}
          className="border-b"
        />
        <SwitchItem
          label="History"
          description="Display finished streams"
          checked={isDisplayHistory.state}
          onCheckedChange={isDisplayHistory.onChange}
          className="rounded-b-xl"
        />
      </div>
      <Header className="mt-6">Filter</Header>
      <div>
        <EntryItem
          label="By streamer"
          onClick={streamer.onClickTrigger}
          className="rounded-xl"
        >
          <StreamerIconList
            ids={streamer.state.slice(0, 8)}
            className="relative h-7 w-10 ml-auto mr-1"
            renderIcon={(s, i, arr) => {
              const n = arr.length - i - 1;
              return (
                <img
                  key={s.id}
                  src={s.youtube.icon}
                  className="absolute top-0 h-7 aspect-square rounded-[50%] object-cover border"
                  style={{ right: 20 * n, zIndex: n }}
                />
              );
            }}
          />
        </EntryItem>
      </div>
    </div>
  );
}
