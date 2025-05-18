import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DialogMenu } from "./dialogMenu";
import { DrawerMenu } from "./drawerMenu";
import { useSettingMenu } from "./viewModel";
import { Content } from "./content";

type Props = {
  trigger: ReactNode;
} & Parameters<typeof useSettingMenu>[0];
export function SettingMenu({ trigger, ...props }: Props) {
  const { isDesktop, open, setOpen, goBack, ...rest } = useSettingMenu(props);

  if (isDesktop)
    return (
      <DialogMenu
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        content={<Content {...rest} />}
        onClickBack={goBack}
      />
    );

  return (
    <DrawerMenu
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      content={<Content {...rest} className="px-4 pb-2" />}
      footer={
        <div
          data-tab={rest.tab}
          className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4"
        >
          <Button onClick={() => setOpen(false)}>Close</Button>
          {goBack && (
            <Button variant="secondary" onClick={goBack}>
              Back
            </Button>
          )}
        </div>
      }
    />
  );
}
