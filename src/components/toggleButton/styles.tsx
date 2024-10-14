import styled from "styled-components";
import { animated } from "@react-spring/web";

export const Container = styled(animated.div)<{
  width: number;
  height: number;
}>`
  position: relative;
  border-radius: ${(p) => p.height / 2 - 1}px;
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
`;

export const Area = styled(animated.input)`
  appearance: none;
  outline: none;
  border: none;
  border-radius: inherit;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s ease;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Knob = styled(animated.label)`
  position: absolute;
  pointer-events: none;
  background-color: #fafafa;
  border-radius: inherit;
`;
