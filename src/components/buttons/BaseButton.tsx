import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { IconContext } from "react-icons";
import { useHover, useTheme, useWindowSize } from "../../hooks";
import { BaseButtonProps } from "../../types";
import styled from "styled-components";

const Container = styled.div`
  width: 25px;
  height: 25px;
`;

export const BaseButton: React.FC<BaseButtonProps> = ({
  onClickHandler,
  children,
  ...props
}) => {
  const { springColors } = useTheme();
  const { hovered, hoverSpread } = useHover();
  const { isMobile } = useWindowSize();

  const { transform } = useSpring({
    transform: hovered ? "scale(1.1)" : "scale(1)",
    config: {
      duration: 100,
    },
  });

  return (
    <Container onClick={onClickHandler} {...hoverSpread} {...props}>
      <IconContext.Provider value={{ size: isMobile ? "90%" : "100%" }}>
        <animated.div
          style={{
            transform,
            color: springColors.text.primary,
            height: "100%",
          }}
        >
          {children}
        </animated.div>
      </IconContext.Provider>
    </Container>
  );
};
