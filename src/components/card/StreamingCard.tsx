import React from "react";
import { StreamingCardProps } from "../../types";
import { ServiceIcon } from "./ServiceIcon";
import { ThumbnailBlock } from "./ThumbnailBlock";
import styled from "styled-components";
import { useConfig, useHover, useWindowSize } from "../../hooks";
import { animated } from "@react-spring/web";
import { breakpoints } from "../../configs";

const Container = styled(animated.div)`
  width: 160px;

  ${breakpoints.mediaQueries.md`
    width: 320px;
  `}
`;

const Card = styled(animated.div)`
  position: relative;

  ${breakpoints.mediaQueries.md`
    min-height: 180px;
  `}
`;

export const StreamingCard = React.memo<StreamingCardProps>(
  ({ title, thumbnail, name, icon, service, url, startAt }) => {
    const { hovered, hoverSpread } = useHover();
    const { isMobile, isDesktopSize } = useWindowSize();
    const { config } = useConfig();

    const expand = isMobile || !isDesktopSize;

    return (
      <Container>
        <Card
          onClick={() => window.open(url)}
          aria-label={title}
          {...hoverSpread}
        >
          <ServiceIcon
            service={service}
            startAt={startAt}
            isExpand={config.isExpandAlways || expand || hovered}
            style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
          />
          <ThumbnailBlock
            title={title}
            thumbnail={thumbnail}
            name={name}
            icon={icon}
            isExpand={config.isExpandAlways || expand || hovered}
            hovered={hovered}
          />
        </Card>
      </Container>
    );
  }
);
