import React, { useMemo, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StreamingTableProps } from "../types";
import { StreamingCard } from "./card";
import { useWindowSize } from "../hooks";
import { theme } from "../theme";

const Container = styled.div<{ height: number }>`
  min-height: ${(p) => p.height}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${theme.breakpoints.mediaQueries.md`
    gap: 40px;
  `}
`;

export const StreamingTable: React.FC<StreamingTableProps> = React.memo(
  ({ streams }) => {
    const container = useRef<HTMLDivElement>(null!);
    const { width, isPhoneSize } = useWindowSize();
    const [rowNum, setRowNum] = useState<number>(0);

    const cardSize = useMemo(
      () => ({
        width: isPhoneSize ? 160 : 320,
        height: isPhoneSize ? 90 : 180,
        headerHeight: isPhoneSize ? 30 : 60,
      }),
      [isPhoneSize]
    );

    useLayoutEffect(() => {
      setRowNum(
        Math.floor((container.current.offsetWidth ?? 0) / (5 + cardSize.width))
      );
    }, [width]);

    const sortedStreams = streams.sort((a, b) =>
      a.startAt + a.name > b.startAt + b.name ? 1 : -1
    );

    const columnNum = Math.ceil(streams.length / rowNum);
    const height =
      columnNum * cardSize.height +
      (columnNum - 1) * 40 +
      cardSize.headerHeight;

    const streamsMatrix = [...Array(rowNum)].map((_, i) =>
      sortedStreams.filter((_, j) => j % rowNum === i)
    );

    return (
      <Container ref={container} height={height}>
        {streamsMatrix.map((st, i) => (
          <FlexBox key={i}>
            {st.length ? (
              st.map((s) => (
                <StreamingCard
                  key={s.id}
                  title={s.title}
                  thumbnail={s.thumbnail}
                  name={s.name}
                  icon={s.icon}
                  service={s.service}
                  url={s.url}
                  startAt={s.startAt}
                />
              ))
            ) : (
              <div style={{ width: cardSize.width }} />
            )}
          </FlexBox>
        ))}
      </Container>
    );
  },
  (prev, next) =>
    prev.streams.map((s) => s.id).toString() ===
    next.streams.map((s) => s.id).toString()
);
