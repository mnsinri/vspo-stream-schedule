import { type ReactNode, type ComponentProps } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = ComponentProps<typeof Drawer> & {
  trigger: ReactNode;
  content: ReactNode;
  footer: ReactNode;
};
export function DrawerMenu({ trigger, content, footer, ...props }: Props) {
  return (
    <Drawer {...props}>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Settings</DrawerTitle>
        <DrawerDescription className="sr-only">
          theme, isMarqueeTitle, filter streamer
        </DrawerDescription>
        <ScrollArea className="max-h-[70vh] overflow-auto">
          {content}
        </ScrollArea>
        <DrawerFooter className="pt-2">{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
