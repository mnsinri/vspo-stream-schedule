import React, { useCallback, useEffect, useRef, useState } from "react";
import { ServiceIconProps } from "../../types";
import styled from "styled-components";
import { animated, easings, useSpring } from "@react-spring/web";
import { IconContext } from "react-icons";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import { useTheme, useWindowSize } from "../../hooks";
import { theme } from "../../theme";
import { parseToJST } from "../../utils";

const Panel = styled(animated.div)`
  display: flex;
  height: 18px;
  border-radius: 8px;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);

  ${theme.breakpoints.mediaQueries.md`
    height: 28px;
    border-radius: 15px;
    box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.25);
  `}
`;

const InnerContainer = styled(animated.div)`
  display: flex;
  align-items: center;
  height: 14px;
  margin: auto;
  gap: 2px;

  ${theme.breakpoints.mediaQueries.md`
    height: 24px;
    gap: 5px;
  `}
`;

const Icon = styled(animated.div)`
  height: 100%;
  width: 12px;
  display: flex;

  ${theme.breakpoints.mediaQueries.md`
    width: 20px;
  `}
`;

const StateText = styled(animated.div)`
  font-weight: bold;
  font-size: 10px;

  ${theme.breakpoints.mediaQueries.md`
    font-size: 16px;
  `}
`;

const getStartTime = (timeString: string) => {
  const date = parseToJST(Date.parse(timeString));
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  service,
  startAt,
  isExpand,
  ...props
}) => {
  const { colors, springColors } = useTheme();
  const startTime = useRef(new Date(startAt));
  const { isMobile } = useWindowSize();
  const serviceColor = useRef<string>();

  const checkLive = () => startTime.current.getTime() < Date.now();
  const [isLive, setLive] = useState(false);

  const ServiceFaIcon = useCallback(() => {
    switch (service) {
      case "youtube":
        serviceColor.current = theme.colors.logoColors.youtube;
        return <FaYoutube />;
      case "twitch":
        serviceColor.current = theme.colors.logoColors.twitch;
        return <FaTwitch />;
    }
  }, [service]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (checkLive()) {
        setLive(true);
        clearInterval(timerId);
      }
    }, 30000);

    if (checkLive()) {
      setLive(true);
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, []);

  const baseSpringConfig = {
    display: isExpand ? "block" : "none",
    width: isExpand ? "85px" : "30px",
    color: isLive ? serviceColor.current : colors.text.primary,
    config: {
      duration: 150,
      easing: easings.easeInOutSine,
    },
  };

  const mobileSpringConfig = {
    width: isExpand ? "48px" : "18px",
  };

  const { width, display, color } = useSpring({
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

  return (
    <div {...props}>
      <Panel style={{ width, backgroundColor: springColors.base.secondary }}>
        <InnerContainer>
          <Icon style={{ color }}>
            <IconContext.Provider value={{ size: "100%" }}>
              <ServiceFaIcon />
            </IconContext.Provider>
          </Icon>
          <StateText
            style={{ display, opacity, color: springColors.text.primary }}
          >
            {isLive ? "LIVE" : getStartTime(startAt)}
          </StateText>
        </InnerContainer>
      </Panel>
    </div>
  );
};
