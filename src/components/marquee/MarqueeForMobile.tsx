import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { animated, useSpring, useSpringRef } from "@react-spring/web";
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

const Item = styled(animated.div)`
  white-space: nowrap;
  padding: 0 20% 0 3%;
`;

type Props = {
  children: ReactNode;
  isAnimate: boolean;
  speed?: number;
};

export const MarqueeForMobile: React.FC<Props> = ({
  children,
  isAnimate,
  speed = 0.05,
  ...props
}) => {
  const { isPhoneSize } = useWindowSize();
  const refParent = useRef<HTMLDivElement>(null!);
  const refChild = useRef<HTMLDivElement>(null!);
  const rect = useRef<DOMRect>(null!);
  const [canMarquee, setCanMarquee] = useState(false);

  const animation = useSpringRef();
  const transform = useSpring({
    ref: animation,
    from: {
      x: "0%",
    },
  });

  const reset = useCallback(() => {
    animation.start({
      from: {
        x: "0%",
      },
      immediate: true,
    });
  }, [animation]);

  const restart = useCallback(
    (duration: number) => {
      animation.start({
        to: {
          x: "-100%",
        },
        reset: true,
        loop: true,
        delay: 1500,
        immediate: false,
        config: {
          duration,
        },
      });
    },
    [animation]
  );

  useLayoutEffect(() => {
    reset();
    const parent = refParent.current.getBoundingClientRect();
    const child = refChild.current.getBoundingClientRect();
    rect.current = child;
    setCanMarquee(parent.width < child.width);
  }, [children, isPhoneSize]);

  useEffect(() => {
    canMarquee && isAnimate
      ? restart((rect.current.width * 15) / speed)
      : reset();
  }, [canMarquee, isAnimate, speed]);

  return (
    <Container ref={refParent} {...props}>
      <Item ref={refChild} style={transform}>
        {children}
      </Item>
      {canMarquee && <Item style={transform}>{children}</Item>}
    </Container>
  );
};
