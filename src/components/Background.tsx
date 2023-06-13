import React from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { ChildrenNode } from "../types";
import { useTheme, useWindowSize } from "../hooks";

const Container = styled(animated.div)<{ vh: string }>`
  position: absolute;
  min-height: ${(p) => p.vh};
  width: 100%;
  z-index: -1;
`;

export const Background: React.FC<ChildrenNode> = ({ children, ...props }) => {
  const { springColors } = useTheme();
  const { y } = useWindowSize();
  return (
    <Container
      vh={`${y}px`}
      style={{ background: springColors.base.primary }}
      {...props}
    >
      {children}
    </Container>
  );
};
