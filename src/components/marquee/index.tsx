import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { Container, ContainerProps, MarqueeItem } from "./styles";

type Props = {
  children: string;
} & ContainerProps;

export const Marquee: FC<Props> = ({ children, ...props }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null!);
  const childRef = useRef<HTMLDivElement>(null!);
  const [canMarquee, setCanMarquee] = useState<boolean>(false);

  useLayoutEffect(() => {
    // TODO marquee
    // setCanMarquee(
    //   parentRef.current.getBoundingClientRect().width <
    //     childRef.current.getBoundingClientRect().width,
    // );
  }, [children]);

  return (
    <Container ref={parentRef} {...props}>
      <MarqueeItem ref={childRef} isActive={canMarquee}>
        {children}
      </MarqueeItem>
      {canMarquee && (
        <MarqueeItem isActive={canMarquee}>{children}</MarqueeItem>
      )}
    </Container>
  );
};
