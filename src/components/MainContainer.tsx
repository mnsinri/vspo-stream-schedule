import React from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { theme } from "../theme";
import { StreamingTable } from "./StreamingTable";
import { DateBorder } from "./DateBorder";
import { useVspoStreams } from "../hooks";
import { StreamInfo, StreamList } from "../types";
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
    width: ${theme.breakpoints.values.sm}px;
  `}

  ${theme.breakpoints.mediaQueries.md`
    width: ${theme.breakpoints.values.md}px;
  `}

  ${theme.breakpoints.mediaQueries.lg`
    width: ${theme.breakpoints.values.lg}px;
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

export const MainContainer = React.memo(() => {
  const streams = useVspoStreams();

  const parseToStreamList = (streams: StreamInfo[]): StreamList[] => {
    const dateSet = new Set(streams.map((s) => s.scheduledDate));
    const streamList = [...dateSet].map((date) => ({
      date,
      streams: streams.filter((s) => s.scheduledDate === date),
    }));

    return streamList.sort((a, b) => (a.date > b.date ? 1 : -1));
  };

  return (
    <Container>
      <InnerContainer>
        <Header />
        {parseToStreamList(streams).map((s) => (
          <TableContainer key={s.date}>
            <DateBorder dateString={s.date} />
            <Spacer />
            <StreamingTable streams={s.streams} />
          </TableContainer>
        ))}
      </InnerContainer>
    </Container>
  );
});
