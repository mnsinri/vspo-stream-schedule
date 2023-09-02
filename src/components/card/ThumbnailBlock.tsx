import React from "react";
import styled from "styled-components";
import { animated, easings, useSpring } from "@react-spring/web";
import { breakpoints } from "../../configs";
import { useConfig, useWindowSize } from "../../hooks";
import { Marquee } from "../marquee";
import { ThumbnailBlockProps } from "../../types";

const Panel = styled(animated.div)`
  width: 160px;
  height: 90px;
  background-color: white;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: relative;
  background-color: ${(p) => p.theme.bg.secondary};
  transition: background-color 0.3s ease;

  ${breakpoints.mediaQueries.md`
    width: 320px;
    height: 180px;
    border-radius: 10px;
  `}
`;

const Thumbnail = styled(animated.img)`
  width: 160px;
  height: 90px;

  ${breakpoints.mediaQueries.md`
    width: 320px;
    height: 180px;
  `}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 30px;

  ${breakpoints.mediaQueries.md`
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

  ${breakpoints.mediaQueries.md`
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

  ${breakpoints.mediaQueries.md`
    margin-left: 6px;
    width: 250px;
  `}
`;

const MarqueeTitle = styled(Marquee)`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 10px;
  width: 100%;
  margin-top: 2px;

  ${breakpoints.mediaQueries.md`
    font-size: 20px;
    margin-top: 0;
  `}
`;

const Name = styled.div`
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-size: 10px;
  transform: scale(0.8);
  transform-origin: 0 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 3%;

  ${breakpoints.mediaQueries.md`
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
  const { isPhoneSize } = useWindowSize();
  const { config } = useConfig();

  const baseSpringConfig = {
    height: isExpand ? "240px" : "180px",
    borderRadius: isExpand ? "10px 10px 0px 0px" : "10px 10px 10px 10px",
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

  const { height, borderRadius, shadow } = useSpring({
    ...baseSpringConfig,
    ...(isPhoneSize ? mobileSpringConfig : {}),
  });

  const { opacity } = useSpring({
    opacity: isExpand ? 1 : 0,
    config: {
      duration: 250,
      easing: easings.easeOutExpo,
    },
  });

  return (
    <Panel style={{ height }} {...props}>
      <Thumbnail
        style={{ borderRadius }}
        src={thumbnail}
        alt={title}
        loading="lazy"
      />
      <Header>
        <Icon src={icon} alt={name} style={{ filter: shadow }} loading="lazy" />
        <Contents style={{ opacity }}>
          <MarqueeTitle
            animate={isExpand && config.isMarquee}
            speed={isPhoneSize ? 0.03 : 0.05}
          >
            {title}
          </MarqueeTitle>
          <Name>{name}</Name>
        </Contents>
      </Header>
    </Panel>
  );
};
