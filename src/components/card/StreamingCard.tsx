import React from "react";
import { StreamingCardProps } from "../../types";
import { ServiceIcon } from "./ServiceIcon";
import { ThumbnailBlock } from "./ThumbnailBlock";
import styled from "styled-components";
import { useHover, useWindowSize } from "../../hooks";
import { animated } from "@react-spring/web";
import { theme } from "../../theme";

const Container = styled(animated.div)`
  width: 160px;
  height: 120px;
  margin: auto;

  ${theme.breakpoint.md`
    width: 320px;
    height: 240px;
  `}
`;

const Card = styled(animated.div)`
  position: relative;

  ${theme.breakpoint.md`
    height: 180px;
  `}
`;

export const StreamingCard: React.FC<StreamingCardProps> = ({
  title,
  thumbnail,
  name,
  icon,
  service,
  url,
  scheduledStartTime,
  ...props
}) => {
  const { hovered, hoverSpread } = useHover();
  const { isDesktop } = useWindowSize();

  return (
    <Container>
      <Card
        onClick={() => window.open(url)}
        aria-label={title}
        {...props}
        {...(isDesktop ? hoverSpread : {})}
      >
        <ServiceIcon
          service={service}
          scheduledStartTime={scheduledStartTime}
          isExpand={hovered || !isDesktop}
          style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
        />
        <ThumbnailBlock
          title={title}
          thumbnail={thumbnail}
          name={name}
          icon={icon}
          isExpand={hovered || !isDesktop}
        />
      </Card>
    </Container>
  );
};
