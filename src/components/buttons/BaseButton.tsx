import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { IconContext } from "react-icons";
import { useHover, useWindowSize } from "../../hooks";
import { BaseButtonProps } from "../../types";

const Container = styled.div`
  width: 27px;
  height: 27px;
`;

export const BaseButton: React.FC<BaseButtonProps> = ({
  onClickHandler,
  children,
  ...props
}) => {
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
            height: "100%",
          }}
        >
          {children}
        </animated.div>
      </IconContext.Provider>
    </Container>
  );
};
