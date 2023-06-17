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
  const checkStream = () => streams.length > 0;
  const streamingLink = (videoId: string) =>
    `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Container {...props}>
      {checkStream() ? (
        streams
          .sort((a, b) =>
            a.scheduledStartTime > b.scheduledStartTime ? 1 : -1
          )
          .map((s) => {
            return (
              <StreamingCard
                key={s.id}
                title={s.title}
                thumbnail={s.thumbnail}
                name={s.name}
                icon={s.icon}
                service={s.service}
                url={streamingLink(s.id)}
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
