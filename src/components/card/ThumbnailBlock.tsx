import React from "react";
import styled from "styled-components";
import { ThumbnailBlockProps } from "../../types";
import { animated, easings, useSpring } from "@react-spring/web";
import { theme } from "../../theme";
import { useTheme, useWindowSize } from "../../hooks";

const Panel = styled(animated.div)`
  width: 160px;
  height: 90px;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: relative;

  ${theme.breakpoints.mediaQueries.md`
    width: 320px;
    height: 180px;
    border-radius: 10px;
  `}
`;

const Thumbnail = styled(animated.img)`
  width: 160px;
  height: 90px;

  ${theme.breakpoints.mediaQueries.md`
    width: 320px;
    height: 180px;
  `}
`;

const Header = styled(animated.div)`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 30px;

  ${theme.breakpoints.mediaQueries.md`
    height: 60px;
  `}
`;

const Icon = styled(animated.img)`
  height: 25px;
  aspect-ratio: 1;
  margin: auto 0;
  margin-left: 3px;
  border-radius: 50%;
  object-fit: cover;

  ${theme.breakpoints.mediaQueries.md`
    height: 50px;
    margin-left: 6px;
  `}
`;

const Contents = styled(animated.div)`
  margin-left: 3px;
  width: 125px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${theme.breakpoints.mediaQueries.md`
    margin-left: 6px;
    width: 250px;
  `}
`;

const Title = styled(animated.div)`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 10px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;

  ${theme.breakpoints.mediaQueries.md`
    font-size: 20px;
    margin-top: 0;
  `}
`;

const Name = styled(animated.div)`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 10px;
  transform: scale(0.8);
  transform-origin: 0 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${theme.breakpoints.mediaQueries.md`
    font-size: 15px;
    transform: scale(1);
  `}
`;

export const ThumbnailBlock: React.FC<ThumbnailBlockProps> = ({
  title,
  thumbnail,
  name,
  icon,
  isExpand,
  ...props
}) => {
  const { colors } = useTheme();
  const { isMobile } = useWindowSize();
  const baseSpringConfig = {
    height: isExpand ? "240px" : "180px",
    borderRadius: isExpand ? "10px 10px 0px 0px" : "10px 10px 10px 10px",
    display: isExpand ? "block" : "none",
    shadow: isExpand
      ? "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))"
      : "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    config: {
      duration: 150,
      easing: easings.easeInOutSine,
    },
  };

  const mobileSpringConfig = {
    height: isExpand ? "120px" : "90px",
    borderRadius: isExpand ? "5px 5px 0px 0px" : "5px 5px 5px 5px",
    shadow: isExpand
      ? "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))"
      : "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
  };

  const { height, borderRadius, display, shadow } = useSpring({
    ...baseSpringConfig,
    ...(isMobile ? mobileSpringConfig : {}),
  });

  const { opacity } = useSpring({
    opacity: isExpand ? 1 : 0,
    config: {
      duration: 250,
      easing: easings.easeInQuart,
    },
  });

  const { backgroundColor, color } = useSpring({
    backgroundColor: colors.base.secondary,
    color: colors.text.primary,
    config: colors.config,
  });

  return (
    <Panel style={{ height, backgroundColor }} {...props}>
      <Thumbnail
        style={{ borderRadius }}
        src={thumbnail}
        alt={title}
        loading="lazy"
      />
      <Header>
        <Icon src={icon} alt={name} style={{ filter: shadow }} loading="lazy" />
        <Contents style={{ opacity, color }}>
          <Title style={{ display }}>{title}</Title>
          <Name style={{ display }}>{name}</Name>
        </Contents>
      </Header>
    </Panel>
  );
};
