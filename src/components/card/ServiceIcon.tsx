import React, { useEffect, useRef, useState } from "react";
import { ServiceIconProps } from "../../types";
import styled from "styled-components";
import { animated, easings, useSpring } from "@react-spring/web";
import { FaYoutube } from "react-icons/fa";
import { useTheme, useTime, useWindowSize } from "../../hooks";
import { theme } from "../../theme";
import { parseJST } from "../../utils";

const IconPanel = styled(animated.div)`
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

const IconContainer = styled(animated.div)`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 14px;
  margin: auto;

  ${theme.breakpoint.md`
    gap: 5px;
    height: 24px;
  `}
`;

const Icon = styled(animated(FaYoutube))`
  height: 90%;
  width: 12px;
  margin-top: 1px;

  ${theme.breakpoint.md`
    width: 20px;
  `};
`;

const StateText = styled(animated.div)`
  font-weight: bold;
  font-size: 10px;
  margin-bottom: 1px;

  ${theme.breakpoint.md`
    font-size: 16px;
  `}
`;

const getStartTime = (timeString: string) => {
  const date = parseJST(Date.parse(timeString));
  return date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  service,
  scheduledStartTime,
  isExpand,
  ...props
}) => {
  const time = useTime();
  const { colors } = useTheme();
  const startTime = useRef(new Date(scheduledStartTime));
  const { isMobile } = useWindowSize();

  const checkLive = () => startTime.current.getTime() < time.current.getTime();
  const [isLive, setLive] = useState(checkLive());

  useEffect(() => {
    const timerId = setInterval(() => {
      if (checkLive()) {
        setLive(true);
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const baseSpringConfig = {
    display: isExpand ? "block" : "none",
    width: isExpand ? "85px" : "30px",
    color: isLive ? "red" : colors.text.primary,
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
      <IconPanel style={{ width, backgroundColor }}>
        <IconContainer>
          <Icon style={{ color }} />
          <StateText style={{ display, opacity, color: textColor }}>
            {isLive ? "LIVE" : getStartTime(scheduledStartTime)}
          </StateText>
        </IconContainer>
      </IconPanel>
    </div>
  );
};
