import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function StreamCard({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "relative overflow-hidden rounded-md sm:rounded-lg bg-menu-item text-primary shadow-lg/20",
        className
      )}
      {...props}
    />
  );
}

function StreamCardThumbnail(props: ComponentProps<"img">) {
  return (
    <img
      className="relative w-full aspect-video z-[1]"
      loading="lazy"
      {...props}
    />
  );
}

function StreamCardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("absolute top-0 left-0 z-[1]", className)} {...props} />
  );
}

function StreamCardStatus({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sm sm:text-base px-2 flex justify-center items-center gap-1 bg-card/90 rounded-xl inset-shadow-sm/20",
        className
      )}
      {...props}
    />
  );
}

function StreamCardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("z-[1]", className)} {...props} />;
}

export {
  StreamCard,
  StreamCardThumbnail,
  StreamCardHeader,
  StreamCardStatus,
  StreamCardFooter,
};
