import {
  ComponentProps,
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";
import { useMarquee } from "./viewModel";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  isAnimate?: boolean;
  speed?: number;
  waitTime?: number;
} & ComponentProps<"div">;
const MarqueeItem = forwardRef<HTMLDivElement, MarqueeProps>(
  ({ isAnimate, speed, waitTime, ...props }, ref) => {
    const { itemRef } = useMarquee({ isAnimate, speed, waitTime });

    return (
      <div
        className="whitespace-nowrap p-[0_20%_0_3%]"
        ref={mergeRefs([itemRef, ref])}
        {...props}
      />
    );
  }
);

export function Marquee({
  isAnimate,
  speed,
  children,
  className,
  ...props
}: MarqueeProps) {
  const parentRef = useRef<HTMLDivElement>(null!);
  const childRef = useRef<HTMLDivElement>(null!);
  const [canMarquee, setCanMarquee] = useState<boolean>(false);

  useLayoutEffect(() => {
    setCanMarquee(
      parentRef.current.getBoundingClientRect().width <
        childRef.current.getBoundingClientRect().width
    );
  }, [children]);

  return (
    <div
      ref={parentRef}
      className={cn(
        "w-full flex overflow-hidden mask-[linear-gradient(to_right,transparent,#fff_5%,#fff_95%,transparent)]",
        className
      )}
      {...props}
    >
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
    </div>
  );
}
