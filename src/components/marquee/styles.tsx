import styled, { css, CSSProperties, keyframes } from "styled-components";

export type ContainerProps = {
  fontSize?: CSSProperties["fontSize"];
};
export const Container = styled.div<ContainerProps>`
  display: flex;
  font-size: ${({ fontSize }) => fontSize ?? "20px"};
  /* overflow: hidden; */
  mask-image: linear-gradient(
    to right,
    transparent,
    #fff 5%,
    #fff 95%,
    transparent
  );
`;

type MarqueeItemProps = {
  isActive?: boolean;
};
const marqueeAnimation = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;
export const MarqueeItem = styled.div<MarqueeItemProps>`
  white-space: nowrap;
  padding: 0 20% 0 0;
  margin-left: 3%;
  ${({ isActive }) =>
    isActive &&
    css`
      animation: ${marqueeAnimation} 10s linear infinite;
      animation-delay: 1.5s;
    `}
`;
