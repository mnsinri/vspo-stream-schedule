import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Stream } from "types";
import { Background, Container, DailyStreamContainer } from "./styles";
import { Header } from "../header";
import { StreamGrid } from "../streamGrid";
import { StreamGridHeader } from "../streamGridHeader";
import { useDisplaySize, useSetting, useVspoStream } from "src/providers";
import { toYYYYMMDD } from "src/utils";

type DailyStream = {
  date: string;
  streams: Stream[];
};

const getPixel = (style: CSSStyleDeclaration, key: string): number => {
  return Number(style.getPropertyValue(key).replace("px", ""));
};

const calcGridProperties = (
  width: number,
  cardWidth: number,
  { gapRange = [20, 80] } = {},
): {
  column: number;
  gap: number;
  options?: {
    gapRange: [number, number];
  };
} => {
  const [minGap, maxGap] = gapRange;

  const column = Math.floor((width + minGap) / (cardWidth + minGap));
  if (column <= 1) return { column, gap: 0 };

  const gap = Math.min((width - cardWidth * column) / (column - 1), maxGap);
  return { column, gap };
};

export const MainContainer: FC = () => {
  const [gridProperties, setGridProperties] = useState<{
    column: number;
    gap: number;
  }>({ column: 0, gap: 0 });
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const displaySize = useDisplaySize();
  const { isDisplayHistory } = useSetting();

  const streams = useVspoStream();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const ref = containerRef.current;

    const [cardWidth, gapRange] = displaySize.mobile
      ? [160, [10, 40]]
      : [320, [20, 80]]; // TODO: 別のとこに定義ておく

    const onResize = () => {
      const style = window.getComputedStyle(ref);
      const width = getPixel(style, "width") - 40;
      setGridProperties(calcGridProperties(width, cardWidth, { gapRange }));
    };
    onResize();
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      setIsScrolled(ref.scrollTop > 0);
    };
    ref.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      ref.removeEventListener("scroll", onScroll);
    };
  }, [displaySize.mobile]);

  const calcStreamGridMinHeight = useCallback(
    (streamNum: number) => {
      const [cardHeight, expandSize, gap] = displaySize.mobile
        ? [90, 30, 20]
        : [180, 60, 40]; // TODO: 別のとこに定義ておく
      const row = Math.ceil(streamNum / gridProperties.column);

      return row * (cardHeight + gap) - gap + expandSize;
    },
    [gridProperties.column, displaySize.mobile],
  );

  const disableScroll = useCallback(() => {
    containerRef.current.style.overflow = "hidden";
  }, []);

  const enableScroll = useCallback(() => {
    containerRef.current.style.overflow = "scroll";
  }, []);

  const dailyStreams: DailyStream[] = useMemo(() => {
    const now = Date.now();
    const isEndedStream = (s: Stream) => s.endAt && s.endAt.getTime() <= now;

    const dailyStreamObj = streams.reduce(
      (result: Record<string, Stream[]>, stream) => {
        if (!isDisplayHistory.state && isEndedStream(stream)) return result;

        const dateStr = toYYYYMMDD(stream.startAt);

        if (result[dateStr]) result[dateStr].push(stream);
        else result[dateStr] = [stream];

        return result;
      },
      {},
    );

    return Object.entries(dailyStreamObj)
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([date, streams]) => ({ date, streams }));
  }, [streams, isDisplayHistory.state]);

  return (
    <Background>
      <Container ref={containerRef}>
        <Header
          isScrolled={isScrolled}
          onOpenMenu={disableScroll}
          onCloseMenu={enableScroll}
        />
        {dailyStreams.map(({ date, streams }) => (
          <DailyStreamContainer key={date}>
            <StreamGridHeader dateString={date} />
            <StreamGrid
              streams={streams}
              {...gridProperties}
              minHeight={calcStreamGridMinHeight(streams.length)}
            />
          </DailyStreamContainer>
        ))}
      </Container>
    </Background>
  );
};
