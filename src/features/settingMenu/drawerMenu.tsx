import { type ReactNode, type ComponentProps } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Props = ComponentProps<typeof Drawer> & {
  trigger: ReactNode;
  contents: ReactNode;
  footer: ReactNode;
};
export function DrawerMenu({ trigger, contents, footer, ...props }: Props) {
  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Settings</DrawerTitle>
        <DrawerDescription className="sr-only">
          theme, isMarqueeTitle, filter streamer
        </DrawerDescription>
        {contents}
        <DrawerFooter className="pt-2">{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
