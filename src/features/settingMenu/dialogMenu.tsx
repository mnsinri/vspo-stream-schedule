import { type ReactNode, type ComponentProps } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = ComponentProps<typeof Dialog> & {
  trigger: ReactNode;
  contents: ReactNode;
};
export function DialogMenu({ trigger, contents, ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          theme, isMarqueeTitle, filter streamer
        </DialogDescription>
        {contents}
      </DialogContent>
    </Dialog>
  );
}
