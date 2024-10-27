import styled from "styled-components";

export const ObserverElement = styled.div<{ height?: number }>`
  min-height: ${({ height }) => height ?? 0}px;
  width: 100%;
`;
