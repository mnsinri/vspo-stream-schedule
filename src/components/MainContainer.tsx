import React, { useMemo } from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { theme } from "../theme";
import { StreamingTable } from "./StreamingTable";
import { DateBorder } from "./DateBorder";
import { useVspoStreams } from "../hooks";
import { StreamInfo } from "../types";
import { parseJST, getFormatedDate } from "../utils";
import { Header } from "./Header";

const Container = styled(animated.div)`
  margin: 0 auto;
  background: rgba(240, 240, 240, 0.08);
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);

  height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${theme.breakpoints.mediaQueries.sm`
    width: calc(${theme.breakpoints.values.sm}px - env(safe-area-inset-right) - env(safe-area-inset-left));
  `}

  ${theme.breakpoints.mediaQueries.md`
    width: calc(${theme.breakpoints.values.md}px - env(safe-area-inset-right) - env(safe-area-inset-left));
  `}

  ${theme.breakpoints.mediaQueries.lg`
    width: calc(${theme.breakpoints.values.lg}px - env(safe-area-inset-right) - env(safe-area-inset-left));
  `}

  ${theme.breakpoints.mediaQueries.xl`
    width: ${theme.breakpoints.values.xl}px;
  `}

  ${theme.breakpoints.mediaQueries.xxl`
    width: ${theme.breakpoints.values.xxl}px;
  `}
`;

const InnerContainer = styled(animated.div)`
  margin: 0 auto;
  width: 87%;

  ${theme.breakpoints.mediaQueries.lg`
    width: 75%;
  `}

  ${theme.breakpoints.mediaQueries.xl`
    width: 87%;
  `}
`;

const Spacer = styled.div`
  height: 20px;
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const MainContainer: React.FC = () => {
  const streams = useVspoStreams();

  const sortedStreams = useMemo(() => {
    const stMap = streams.reduce(
      (map: Map<string, StreamInfo[]>, cur: StreamInfo) => {
        const fDate = getFormatedDate(parseJST(Date.parse(cur.startAt)));

        if (map.has(fDate)) {
          map.get(fDate)?.push(cur);
        } else {
          map.set(fDate, [cur]);
        }

        return map;
      },
      new Map<string, StreamInfo[]>()
    );

    return Array.from(stMap).sort((a, b) => (a[0] > b[0] ? 1 : -1));
  }, [streams]);

  return (
    <Container>
      <InnerContainer>
        <Header />
        {sortedStreams.map((m) => (
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
