import { ComponentProps } from "react";
import { useMarquee } from "./viewModel";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  isAnimate?: boolean;
  speed?: number;
  waitTime?: number;
} & ComponentProps<"div">;

export function Marquee({
  isAnimate,
  speed,
  children,
  className,
  ...props
}: MarqueeProps) {
  const { parentRef, childRef, itemRef, canMarquee } = useMarquee({
    isAnimate,
    speed,
  });

  return (
    <div
      ref={parentRef}
      data-marquee={canMarquee}
      className={cn(
        "w-full flex overflow-hidden data-[marquee=true]:mask-[linear-gradient(to_right,transparent,#fff_5%,#fff_95%,transparent)]",
        className
      )}
      {...props}
    >
      <div ref={itemRef} className="flex">
        <div
          ref={childRef}
          className="whitespace-nowrap pr-2"
          children={children}
        />
        {canMarquee && (
          <div className="whitespace-nowrap pr-2" children={children} />
        )}
      </div>
    </div>
  );
}
