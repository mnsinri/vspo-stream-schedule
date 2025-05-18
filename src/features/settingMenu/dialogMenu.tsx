import { type ReactNode, type ComponentProps } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";

type Props = ComponentProps<typeof Dialog> & {
  trigger: ReactNode;
  content: ReactNode;
  onClickBack?: () => void;
};
export function DialogMenu({ trigger, content, onClickBack, ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          theme, isMarqueeTitle, filter streamer
        </DialogDescription>
        {onClickBack && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClickBack}
              className="text-sm absolute top-2 left-2 z-10"
            >
              <IoIosArrowBack />
              <span className="mb-0.5">Back</span>
            </Button>
            <div className="h-4" />
          </>
        )}
        <ScrollArea className="max-h-[70vh] overflow-auto">
          {content}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
