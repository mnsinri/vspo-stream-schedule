import {
  ComponentProps,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { useThrottle } from "@/hooks/useThrottle";

type MarqueeProps = {
  isAnimate?: boolean;
  speed?: number;
  waitTime?: number;
} & ComponentProps<"div">;

export function useMarquee({
  isAnimate,
  speed = 1,
  waitTime = 1500,
}: MarqueeProps) {
  const parentRef = useRef<HTMLDivElement>(null!);
  const childRef = useRef<HTMLDivElement>(null!);
  const [canMarquee, setCanMarquee] = useState<boolean>(false);

  const itemRef = useRef<HTMLDivElement>(null!);
  const rect = useRef<DOMRect>(null!);
  const start = useRef<number | null>(null);
  const x = useRef<number>(0);

  const isMarquee = isAnimate && canMarquee;

  const _onResize = useCallback(() => {
    rect.current = itemRef.current.getBoundingClientRect();
    setCanMarquee(
      parentRef.current.getBoundingClientRect().width <
        childRef.current.getBoundingClientRect().width
    );
  }, []);
  const onResize = useThrottle(_onResize);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  useLayoutEffect(() => {
    itemRef.current.style.transform = `translateX(0)`;
    x.current = 0;
    start.current = null;
  }, [isMarquee]);

  const animateCallback = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (!(isMarquee && itemRef.current && rect.current)) return;

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
    [isMarquee, speed, waitTime]
  );

  useAnimationFrame(animateCallback);

  return { parentRef, childRef, itemRef, isMarquee };
}
