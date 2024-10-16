import React, { ComponentProps, FC, memo, useMemo } from "react";
import {
  Button,
  Container,
  PreviewContainer,
  PreviewStreamerIcon,
  StreamerIcon,
} from "./styles";
import { Dropdown, DropdownItem } from "../dropdownMenu";
import {
  useDisplaySize,
  useVspoStreamer,
  useVspoStreamFilter,
} from "src/providers";
import { MdFilterListOff } from "react-icons/md";
import { Streamer } from "types";

type DropdownItemContents = {
  triggerContents: ComponentProps<typeof DropdownItem>["contents"];
};
type Props = Omit<ComponentProps<typeof Dropdown>, "trigger"> &
  DropdownItemContents;
type StreamerIcons = Streamer["youtube"]["icon"][];

const StreamerFilterTrigger = memo(
  ({
    triggerContents,
    icons,
  }: DropdownItemContents & { icons: StreamerIcons }) => {
    return (
      <DropdownItem contents={triggerContents} hoverable>
        <PreviewContainer>
          {icons.slice(0, 7).map((src, n, arr) => (
            <PreviewStreamerIcon key={src} src={src} n={arr.length - n - 1} />
          ))}
        </PreviewContainer>
      </DropdownItem>
    );
  },
);

export const StreamerFilter: FC<Props> = ({
  triggerContents,
  ...dropdownProps
}) => {
  const streamers = useVspoStreamer();
  const { filter, streamerIds } = useVspoStreamFilter();
  const { mobile } = useDisplaySize();

  const filteredStreamerIcons = streamerIds.reduce(
    (result: StreamerIcons, streamerId) => {
      // TODO: use Map
      const streamer = streamers.find(({ id }) => id === streamerId);
      return result.concat(streamer?.youtube.icon ?? []);
    },
    [],
  );

  const sortedStreamers = useMemo(
    () => [...streamers].sort((a, b) => a.id.localeCompare(b.id)),
    [streamers],
  );

  const checkClicked = (id: string) => streamerIds.includes(id);
  const onClick = (id: string) => {
    const type = checkClicked(id)
      ? "removeStreamerFilter"
      : "addStreamerFilter";
    filter({ type, payload: [id] });
  };
  const onClear = () => {
    filter({ type: "clearStreamerFilter" });
  };

  const Contents = (isMobile: boolean) => (
    <>
      <DropdownItem
        contents={{ text: "Filter by streamer" }}
        style={{ fontSize: isMobile ? 13 : 16 }}
      >
        <Button onClick={onClear}>
          <MdFilterListOff size={isMobile ? 16 : 20} />
        </Button>
      </DropdownItem>
      <Container>
        {sortedStreamers.map((s) => (
          <StreamerIcon
            key={s.id}
            src={s.youtube.icon}
            isClicked={checkClicked(s.id)}
            onClick={() => onClick(s.id)}
          />
        ))}
      </Container>
    </>
  );

  if (mobile) return Contents(mobile);

  return (
    <Dropdown
      {...dropdownProps}
      trigger={
        <StreamerFilterTrigger
          triggerContents={triggerContents}
          icons={filteredStreamerIcons}
        />
      }
    >
      {Contents(mobile)}
    </Dropdown>
  );
};
