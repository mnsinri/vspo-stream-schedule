import { type Platform } from "@types";
import { type IconType } from "react-icons";

import { FaYoutube, FaTwitch } from "react-icons/fa";
import { TbBroadcast } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<IconType> & {
  platform: Platform;
};

export function PlatformIcon({ platform, className, ...props }: Props) {
  switch (platform) {
    case "youtube":
      return (
        <FaYoutube
          className={cn("text-[#ff0000] mt-[2px]", className)}
          {...props}
        />
      );
    case "twitch":
      return (
        <FaTwitch
          className={cn("text-[#9146FF] mt-[4px]", className)}
          {...props}
        />
      );
    case "twitCasting":
      return (
        <TbBroadcast
          className={cn("text-[#0092fa] mt-[2px]", className)}
          {...props}
        />
      );
  }
}
