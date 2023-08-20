import React from "react";
import styled from "styled-components";
import { breakpoints } from "../configs";
import { StreamingTable } from "./StreamingTable";
import { DateBorder } from "./DateBorder";
import { useVspoStreams } from "../hooks";
import { StreamInfo, StreamList } from "../types";
import { Header } from "./Header";

const Container = styled.div`
  margin: 0 auto;
  background: rgba(240, 240, 240, 0.08);
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
  color: ${(p) => p.theme.text.primary};
  transition: color 0.3s ease;

  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${breakpoints.mediaQueries.sm`
    width: ${breakpoints.values.sm}px;
  `}

  ${breakpoints.mediaQueries.md`
    width: ${breakpoints.values.md}px;
  `}

  ${breakpoints.mediaQueries.lg`
    width: ${breakpoints.values.lg}px;
  `}

  ${breakpoints.mediaQueries.xl`
    width: ${breakpoints.values.xl}px;
  `}

  ${breakpoints.mediaQueries.xxl`
    width: ${breakpoints.values.xxl}px;
  `}
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  width: 90%;

  ${breakpoints.mediaQueries.sm`
    width: 88%;
  `}

  ${breakpoints.mediaQueries.lg`
    width: 73%;
  `}

  ${breakpoints.mediaQueries.xl`
    width: 88%;
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
