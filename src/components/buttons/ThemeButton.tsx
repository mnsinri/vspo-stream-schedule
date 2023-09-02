import React from "react";
import styled from "styled-components";
import { animated, useTransition } from "@react-spring/web";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useTheme } from "../../hooks";
import { BaseButton } from "./BaseButton";
import { springConfig } from "../../configs";

const Wrapper = styled(animated.div)`
  position: absolute;
`;

export const ThemeButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const { themeType, setThemeDark } = useTheme();

  const transitions = useTransition(themeType, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: springConfig,
  });

  return (
    <BaseButton onClickHandler={() => setThemeDark(true)} {...props}>
      {transitions((style, themeType) => (
        <Wrapper style={style}>
          {themeType === "dark" ? <IoMdSunny /> : <IoMdMoon />}
        </Wrapper>
      ))}
    </BaseButton>
  );
};
