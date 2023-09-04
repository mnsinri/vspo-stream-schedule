import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { MarqueeItem } from "./MarqueeItem";
import styled from "styled-components";
import { useWindowSize } from "../../hooks";

const Container = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent,
    #fff 5%,
    #fff 95%,
    transparent
  );
`;

type Props = {
  children: ReactNode;
  isAnimate: boolean;
  speed?: number;
};

export const MarqueeScroll: React.FC<Props> = ({
  children,
  isAnimate,
  speed = 1,
  ...props
}) => {
  const { isPhoneSize } = useWindowSize();
  const parentRef = useRef<HTMLDivElement>(null!);
  const childRef = useRef<HTMLDivElement>(null!);
  const [canMarquee, setCanMarquee] = useState<boolean>(false);

  useLayoutEffect(() => {
    setCanMarquee(
      parentRef.current.getBoundingClientRect().width <
        childRef.current.getBoundingClientRect().width
    );
  }, [children, isPhoneSize]);

  return (
    <Container ref={parentRef} {...props}>
      <MarqueeItem
        ref={childRef}
        isAnimate={canMarquee && isAnimate}
        speed={speed}
      >
        {children}
      </MarqueeItem>
      {canMarquee && (
        <MarqueeItem isAnimate={isAnimate} speed={speed}>
          {children}
        </MarqueeItem>
      )}
    </Container>
  );
};
