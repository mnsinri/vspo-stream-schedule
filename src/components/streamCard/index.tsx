import React, { FC, useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { iconColor } from "src/configs/colors";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import { TbBroadcast } from "react-icons/tb";
import { Stream } from "types";

import { useHover, useInterval } from "src/hooks";
import {
  TextContainer,
  Details,
  StreamerIcon,
  Name,
  Card,
  Thumbnail,
  StreamInfo,
  PlatformIconContainer,
  StateText,
} from "./styles";
import { Marquee } from "../marquee";
import { useDisplaySize, useSetting } from "src/providers";
import { toJstHHMM } from "src/utils";

type Props = {
  stream: Stream;
};

type StreamState = "upcoming" | "live" | "ended";

export const StreamCard: FC<Props> = ({ stream }) => {
  const theme = useTheme();
  const [streamState, setStreamState] = useState<StreamState>("upcoming");
  const { hovered, hoverParams } = useHover();

  const { isExpandAlways: expand } = useSetting();
  const isExpand = useMemo(
    () => hovered || expand.state,
    [hovered, expand.state],
  );

  const displaySize = useDisplaySize();
  const titleFontSize = useMemo(
    () => (displaySize.mobile ? "11px" : "20px"),
    [displaySize.mobile],
  );

  const isLive = streamState === "live";
  const isEnded = streamState === "ended";

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

  const scheduledTimeText = useMemo(() => {
    if (isLive) return "LIVE";
    return toJstHHMM(stream.startAt);
  }, [streamState, stream.startAt.toString()]);

  const PlatformIcon = useCallback(() => {
    const color = isLive ? iconColor[stream.platform] : theme.card.text;
    switch (stream.platform) {
      case "youtube":
        return <FaYoutube style={{ color, marginTop: 2 }} />;
      case "twitch":
        return <FaTwitch style={{ color, marginTop: 4 }} />;
      case "twitCasting":
        return <TbBroadcast style={{ color, marginTop: 2 }} />;
    }
  }, [streamState, stream.platform, theme.card.text]);

  return (
    <Card
      {...hoverParams}
      isExpand={isExpand}
      onClick={() => window.open(stream.url)}
    >
      <Thumbnail src={stream.thumbnail} loading="lazy" />
      <StreamInfo isExpand={isExpand && !isEnded}>
        <PlatformIconContainer>
          <PlatformIcon />
        </PlatformIconContainer>
        <StateText isExpand={isExpand && !isEnded}>
          {scheduledTimeText}
        </StateText>
      </StreamInfo>
      <Details>
        <StreamerIcon src={stream.icon} loading="lazy" />
        <TextContainer isExpand={isExpand}>
          <Marquee fontSize={titleFontSize}>{stream.title}</Marquee>
          <Name>{stream.streamerName}</Name>
        </TextContainer>
      </Details>
    </Card>
  );
};
