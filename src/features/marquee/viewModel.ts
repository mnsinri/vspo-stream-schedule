import { ComponentProps, useLayoutEffect, useRef } from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";

type MarqueeProps = {
  isAnimate?: boolean;
  speed?: number;
  waitTime?: number;
} & ComponentProps<"div">;

export function useMarquee({
  isAnimate,
  speed = 1,
  waitTime = 1500,
  children,
}: MarqueeProps) {
  const itemRef = useRef<HTMLDivElement>(null!);
  const rect = useRef<DOMRect>(null!);
  const start = useRef<number | null>(null);
  const x = useRef<number>(0);

  useLayoutEffect(() => {
    rect.current = itemRef.current.getBoundingClientRect();
  }, [children]);

  useLayoutEffect(() => {
    itemRef.current.style.transform = `translateX(0)`;
    x.current = 0;
    start.current = null;
  }, [isAnimate]);

  useAnimationFrame((timestamp) => {
    if (!(isAnimate && itemRef.current && rect.current)) return;

    if (!start.current) start.current = timestamp;

    if (timestamp - start.current < waitTime) return;

    x.current -= speed;
    if (x.current < -rect.current.width) {
      x.current = 0;
      start.current = null;
    }

    itemRef.current.style.transform = `translateX(${
      (x.current / rect.current.width) * 100
    }%)`;
  });

  return { itemRef };
}
