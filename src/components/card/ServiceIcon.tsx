import React, { useCallback, useEffect, useRef, useState } from "react";
import { ServiceIconProps } from "../../types";
import styled from "styled-components";
import { animated, easings, useSpring } from "@react-spring/web";
import { IconContext } from "react-icons";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import { useTheme, useWindowSize } from "../../hooks";
import { theme } from "../../theme";
import { parseJST } from "../../utils";

const Panel = styled(animated.div)`
  display: flex;
  height: 18px;
  border-radius: 8px;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);

  ${theme.breakpoint.md`
    height: 28px;
    border-radius: 15px;
    box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.25);
  `}
`;

const InnerContainer = styled(animated.div)`
  display: flex;
  height: 14px;
  margin: auto;

  ${theme.breakpoint.md`
    height: 24px;
  `}
`;

const Icon = styled(animated.div)`
  height: 75%;
  display: flex;
  align-self: center;
  margin-top: 1px;
`;

const StateText = styled(animated.span)`
  font-weight: bold;
  font-size: 10px;
  vertical-align: middle;
  margin-left: 2px;

  ${theme.breakpoint.md`
    font-size: 16px;
    margin-left: 5px;
  `}
`;

const getStartTime = (timeString: string) => {
  const date = parseJST(Date.parse(timeString));
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  service,
  startAt,
  isExpand,
  ...props
}) => {
  const { colors } = useTheme();
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
    width: isExpand ? "50px" : "22px",
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

  const { backgroundColor, textColor } = useSpring({
    backgroundColor: colors.base.secondary,
    textColor: colors.text.primary,
    config: colors.config,
  });

  return (
    <div {...props}>
      <Panel style={{ width, backgroundColor }}>
        <InnerContainer>
          <Icon style={{ color }}>
            <IconContext.Provider value={{ size: "100%" }}>
              <ServiceFaIcon />
            </IconContext.Provider>
          </Icon>
          <StateText style={{ display, opacity, color: textColor }}>
            {isLive ? "LIVE" : getStartTime(startAt)}
          </StateText>
        </InnerContainer>
      </Panel>
    </div>
  );
};
