import React from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { StreamingTableProps } from "../types";
import { StreamingCard } from "./card";
import { theme } from "../theme";

const Container = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 20px 0px;
  justify-content: space-between;

  ${theme.breakpoint.md`
    grid-template-columns: repeat(auto-fill, 320px);
  `}
`;

export const StreamingTable: React.FC<StreamingTableProps> = ({
  streams,
  ...props
}) => {
  const sortedStreams = streams.sort((a, b) =>
    a.scheduledStartTime + a.name > b.scheduledStartTime + b.name ? 1 : -1
  );
  const checkStream = () => streams.length > 0;

  return (
    <Container {...props}>
      {checkStream() ? (
        sortedStreams.map((s) => {
          return (
            <StreamingCard
              key={s.id}
              title={s.title}
              thumbnail={s.thumbnail}
              name={s.name}
              icon={s.icon}
              service={s.service}
              url={s.url}
              scheduledStartTime={s.scheduledStartTime}
            />
          );
        })
      ) : (
        <h1>No data GG</h1>
      )}
    </Container>
  );
};
