import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Toggle } from "./ui/toggle";

type Props = {
  children: ReactNode;
  description: string;
} & ComponentProps<typeof Toggle>;

export function ToggleButton({
  children,
  className,
  description,
  ...props
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            {...props}
            variant="outline"
            className={cn(
              "data-[state=on]:bg-vspo-primary transition-colors",
              className
            )}
            children={children}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
