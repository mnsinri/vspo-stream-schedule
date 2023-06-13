import React from "react";
import styled from "styled-components";
import { animated, useTransition } from "@react-spring/web";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useTheme } from "../../hooks";
import { BaseButton } from "./BaseButton";

const Wrapper = styled(animated.div)`
  position: absolute;
`;

export const ThemeButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const { colors, springColors, toggleTheme, isDark } = useTheme();

  const transitions = useTransition(isDark, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: colors.config,
  });

  return (
    <BaseButton onClickHandler={toggleTheme} {...props}>
      {transitions((style, isDark) => (
        <Wrapper style={{ ...style, color: springColors.text.primary }}>
          {isDark ? <IoMdSunny /> : <IoMdMoon />}
        </Wrapper>
      ))}
    </BaseButton>
  );
};
