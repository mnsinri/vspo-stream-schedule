import {
  ComponentProps,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";

type MarqueeProps = {
  isAnimate?: boolean;
  speed?: number;
  waitTime?: number;
} & ComponentProps<"div">;

export function useMarquee({
  isAnimate: _isAnimate,
  speed = 1,
  waitTime = 1500,
  children,
}: MarqueeProps) {
  const parentRef = useRef<HTMLDivElement>(null!);
  const childRef = useRef<HTMLDivElement>(null!);
  const [canMarquee, setCanMarquee] = useState<boolean>(false);

  const itemRef = useRef<HTMLDivElement>(null!);
  const rect = useRef<DOMRect>(null!);
  const start = useRef<number | null>(null);
  const x = useRef<number>(0);

  const isAnimate = _isAnimate && canMarquee;

  useLayoutEffect(() => {
    rect.current = itemRef.current.getBoundingClientRect();
    setCanMarquee(
      parentRef.current.getBoundingClientRect().width <
        childRef.current.getBoundingClientRect().width
    );
  }, [children]);

  useLayoutEffect(() => {
    itemRef.current.style.transform = `translateX(0)`;
    x.current = 0;
    start.current = null;
  }, [isAnimate]);

  const animateCallback = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (!(isAnimate && itemRef.current && rect.current)) return;

      if (!start.current) start.current = timestamp;

      if (timestamp - start.current < waitTime) return;

      x.current -= speed;
      if (x.current < -rect.current.width) {
        x.current = 0;
        start.current = null;
      }

      itemRef.current.style.transform = `translateX(${
        (x.current / rect.current.width) * 50
      }%)`;
    },
    [isAnimate, speed, waitTime]
  );

  useAnimationFrame(animateCallback);

  return { parentRef, childRef, itemRef, canMarquee };
}
