import { BiMenu } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { DialogMenu } from "./dialogMenu";
import { DrawerMenu } from "./drawerMenu";
import { useSettingMenu } from "./viewModel";
import { Contents } from "./contents";

export function SettingMenu() {
  const { isDesktop, open, setOpen, ...rest } = useSettingMenu();

  const MenuButton = (
    <Button variant="ghost" size="icon">
      <BiMenu className="!size-5" />
    </Button>
  );

  if (isDesktop)
    return (
      <DialogMenu
        open={open}
        onOpenChange={setOpen}
        trigger={MenuButton}
        contents={<Contents {...rest} />}
      />
    );

  return (
    <DrawerMenu
      open={open}
      onOpenChange={setOpen}
      trigger={MenuButton}
      contents={<Contents {...rest} className="px-4 pb-2" />}
      footer={
        <div
          data-tab={rest.tab}
          className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4"
        >
          <Button onClick={() => setOpen(false)}>Close</Button>
          {rest.tab === "streamerFilter" && (
            <Button variant="secondary" onClick={rest.goBack}>
              Back
            </Button>
          )}
        </div>
      }
    />
  );
}
