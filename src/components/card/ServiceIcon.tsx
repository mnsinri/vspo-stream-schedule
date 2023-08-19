import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ServiceIconProps } from "../../types";
import styled from "styled-components";
import { animated, easings, useSpring } from "@react-spring/web";
import { IconContext } from "react-icons";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import { TbBroadcast } from "react-icons/tb";
import { useTheme, useWindowSize } from "../../hooks";
import { breakpoints, baseColors } from "../../configs";
import { parseToJST } from "../../utils";

const Panel = styled(animated.div)`
  display: flex;
  background-color: ${(p) => p.theme.bg.secondary};
  transition: background-color 0.3s ease;
  height: 18px;
  border-radius: 8px;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);

  ${breakpoints.mediaQueries.md`
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

  ${breakpoints.mediaQueries.md`
    height: 24px;
    gap: 5px;
  `}
`;

const Icon = styled(animated.div)`
  height: 100%;
  width: 12px;
  display: flex;

  ${breakpoints.mediaQueries.md`
    width: 20px;
  `}
`;

const StateText = styled(animated.div)`
  font-weight: bold;
  font-size: 10px;

  ${breakpoints.mediaQueries.md`
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
  const { isPhoneSize } = useWindowSize();
  const serviceColor = useMemo(() => {
    switch (service) {
      case "youtube":
        return baseColors.logo.youtube;
      case "twitch":
        return baseColors.logo.twitch;
      case "twitCasting":
        return baseColors.logo.twitCasting;
    }
  }, [service]);
  const startDate = useMemo(() => new Date(startAt), [startAt]);
  const [isLive, setLive] = useState<boolean>(false);
  const { theme } = useTheme();

  const checkLive = () => startDate.getTime() < Date.now();

  const ServiceIcon = useCallback(() => {
    switch (service) {
      case "youtube":
        return <FaYoutube />;
      case "twitch":
        return <FaTwitch />;
      case "twitCasting":
        return <TbBroadcast />;
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
    color: isLive ? serviceColor : theme.text.primary,
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
    ...(isPhoneSize ? mobileSpringConfig : {}),
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
      <Panel style={{ width }}>
        <InnerContainer>
          <Icon style={{ color }}>
            <IconContext.Provider value={{ size: "100%" }}>
              <ServiceIcon />
            </IconContext.Provider>
          </Icon>
          <StateText style={{ display, opacity }}>
            {isLive ? "LIVE" : getStartTime(startAt)}
          </StateText>
        </InnerContainer>
      </Panel>
    </div>
  );
};
