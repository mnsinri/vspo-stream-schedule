import React from "react";
import styled from "styled-components";
import { animated } from "@react-spring/web";
import { ChildrenNode } from "../types";
import { useTheme } from "../hooks";

const Container = styled(animated.div)`
  height: 100svh;
  width: 100svw;
`;

export const Background = React.memo<ChildrenNode>(({ children, ...props }) => {
  const { springColors } = useTheme();
  return (
    <Container style={{ background: springColors.base.primary }} {...props}>
      {children}
    </Container>
  );
});
