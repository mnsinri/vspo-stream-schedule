import React, { ReactNode } from "react";
import { useWindowSize } from "../../hooks";
import { MarqueeForMobile } from "./MarqueeForMobile";
import { MarqueeScroll } from "./MarqueeScroll";

type Props = {
  children: ReactNode;
  isAnimate?: boolean;
  speed?: number;
};

export const Marquee: React.FC<Props> = ({
  children,
  isAnimate = false,
  speed = 0.05,
  ...props
}) => {
  const { isMobile } = useWindowSize();

  return isMobile ? (
    <MarqueeForMobile isAnimate={isAnimate} speed={speed} {...props}>
      {children}
    </MarqueeForMobile>
  ) : (
    <MarqueeScroll isAnimate={isAnimate} speed={speed} {...props}>
      {children}
    </MarqueeScroll>
  );
};
