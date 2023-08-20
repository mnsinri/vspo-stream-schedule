import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { MarqueeProps } from "../../types";
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

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  animate = true,
  speed = 0.05,
  ...props
}) => {
  const { isPhoneSize } = useWindowSize();
  const refParent = useRef<HTMLDivElement>(null!);
  const refChild = useRef<HTMLDivElement>(null!);
  const rect = useRef<{ parent: DOMRect; child: DOMRect }>(null!);
  const [canMarquee, setCanMarquee] = useState(false);

  const animation = useSpringRef();
  const transform = useSpring({
    ref: animation,
    from: {
      x: "0%",
    },
  });

  const reset = () => {
    animation.start({
      from: {
        x: "0%",
      },
      immediate: true,
    });
  };

  const restart = (duration: number) => {
    animation.start({
      from: {
        x: "0%",
      },
      to: {
        x: "-100%",
      },
      reset: true,
      loop: true,
      delay: 900,
      immediate: false,
      config: {
        duration,
      },
    });
  };

  useLayoutEffect(() => {
    reset();
    const parent = refParent.current.getBoundingClientRect();
    const child = refChild.current.getBoundingClientRect();
    rect.current = { parent, child };
    setCanMarquee(parent.width < child.width);
  }, [children, isPhoneSize]);

  useEffect(() => {
    canMarquee && animate ? restart(rect.current.child.width / speed) : reset();
  }, [canMarquee, animate, speed]);

  return (
    <Container ref={refParent} {...props}>
      <Item ref={refChild} style={transform}>
        {children}
      </Item>
      {canMarquee && <Item style={transform}>{children}</Item>}
    </Container>
  );
};
