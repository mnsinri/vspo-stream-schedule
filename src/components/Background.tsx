import React from "react";
import styled from "styled-components";
import { ChildrenNode } from "../types";

const Container = styled.div`
  height: 100svh;
  width: 100svw;
  background-color: ${(p) => p.theme.bg.primary};
  transition: background-color 0.3s ease;
`;

export const Background = React.memo<ChildrenNode>(({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
});
