import React from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { theme } from "../theme";
import { StreamingTable } from "./StreamingTable";
import { DateBorder } from "./DateBorder";
import { useVspoStreams, useWindowSize } from "../hooks";
import { StreamingInfo } from "../types";
import { parseJST, getFormatedDate } from "../utils";
import { Header } from "./Header";

const Container = styled(animated.div)<{ vh: string }>`
  margin: 0 auto;
  min-height: ${(p) => p.vh};
  background: rgba(240, 240, 240, 0.08);
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);

  ${theme.breakpoint.sm`
    width: 640px;
  `}

  ${theme.breakpoint.md`
    width: 768px;
  `}

  ${theme.breakpoint.lg`
    width: 1024px;
  `}

  ${theme.breakpoint.xl`
    width: 1280px;
  `}

  ${theme.breakpoint.xll`
    width: 1680px;
  `}
`;

const InnerContainer = styled(animated.div)`
  margin: 0 auto;
  width: 87%;
  padding-bottom: 50px;

  ${theme.breakpoint.lg`
    width: 75%;
  `}

  ${theme.breakpoint.xl`
    width: 87%;
  `}
`;

const Spacer = styled.div`
  height: 20px;
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const StreamingView: React.FC = () => {
  const { streams } = useVspoStreams();
  const { y } = useWindowSize();

  const streamMap = streams.youtube.reduce(
    (map: Map<string, StreamingInfo[]>, cur: StreamingInfo) => {
      const fDate = getFormatedDate(
        parseJST(Date.parse(cur.scheduledStartTime))
      );

      if (map.has(fDate)) {
        map.get(fDate)?.push(cur);
      } else {
        map.set(fDate, [cur]);
      }

      return map;
    },
    new Map<string, StreamingInfo[]>()
  );

  return (
    <Container vh={`${y}px`}>
      <InnerContainer>
        <Header />
        {Array.from(streamMap)
          .sort((a, b) => (a[0] > b[0] ? 1 : -1))
          .map((m) => (
            <TableContainer key={m[0]}>
              <DateBorder dateString={m[0]} />
              <Spacer />
              <StreamingTable streams={m[1]} />
            </TableContainer>
          ))}
      </InnerContainer>
    </Container>
  );
};
