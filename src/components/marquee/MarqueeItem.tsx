import React, { ReactNode, forwardRef, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { useAnimationFrame, useWindowSize } from "../../hooks";
import { mergeRefs } from "react-merge-refs";

const Container = styled.div`
  white-space: nowrap;
  padding: 0 20% 0 3%;
`;

type Props = {
  children: ReactNode;
  isAnimate: boolean;
  speed?: number;
  waitTime?: number;
};

export const MarqueeItem = forwardRef<HTMLDivElement, Props>(
  ({ children, isAnimate, speed = 1, waitTime = 1500 }, forwardedRef) => {
    const { isPhoneSize } = useWindowSize();
    const item = useRef<HTMLDivElement>(null!);
    const rect = useRef<DOMRect>(null!);
    const start = useRef<number | null>(null);
    const x = useRef<number>(0);

    useLayoutEffect(() => {
      rect.current = item.current.getBoundingClientRect();
    }, [children, isPhoneSize]);

    useLayoutEffect(() => {
      item.current.style.transform = `translateX(0)`;
      x.current = 0;
      start.current = null;
    }, [isAnimate]);

    useAnimationFrame((timestamp) => {
      if (!(isAnimate && item.current && rect.current)) return;

      if (!start.current) start.current = timestamp;

      if (timestamp - start.current < waitTime) return;

      x.current -= speed;
      if (x.current < -rect.current.width) {
        x.current = 0;
        start.current = null;
      }

      item.current.style.transform = `translateX(${
        (x.current / rect.current.width) * 100
      }%)`;
    });

    return (
      <Container ref={mergeRefs([item, forwardedRef])}>{children}</Container>
    );
  }
);
