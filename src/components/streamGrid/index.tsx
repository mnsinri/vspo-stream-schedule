import React, { FC, useMemo } from "react";
import { Stream } from "types";
import { Container, ColumnContainer, DummyCard } from "./styles";
import { StreamCard } from "../streamCard";

type Props = {
  streams: Stream[];
  column: number;
  gap: number;
  minHeight: number;
};
export const StreamGrid: FC<Props> = ({ streams, column, gap, minHeight }) => {
  const streamsMatrix = useMemo(() => {
    console.log("streamsMatrix", column);
    const sortedStreams = [...streams].sort(
      (a, b) =>
        a.startAt.getTime() - b.startAt.getTime() ||
        a.streamerName.localeCompare(b.streamerName),
    );

    return Array.from({ length: column }, (_, i) => {
      const st = sortedStreams.filter((_, j) => j % column === i);
      return st.length > 0 ? st : null;
    });
  }, [streams, column]);

  return (
    <Container gap={gap} minHeight={minHeight}>
      {streamsMatrix.map((columnStreams, i) => (
        <ColumnContainer key={i}>
          {columnStreams ? (
            columnStreams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))
          ) : (
            <DummyCard />
          )}
        </ColumnContainer>
      ))}
    </Container>
  );
};
