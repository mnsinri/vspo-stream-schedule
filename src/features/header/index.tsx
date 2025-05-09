import logo from "@/assets/logo.png";
import { SettingMenu } from "../settingMenu";
import { useHeader } from "./viewModel";

export function Header() {
  const { isScrolled } = useHeader();
  const cn = isScrolled ? "shadow-lg border-b" : "shadow-none";

  return (
    <div
      className={`
      py-3 px-5 lg:px-15 w-full 
      sticky top-0 left-0 
      flex items-center gap-2 
      rounded-b-lg bg-background z-10
      transition-shadow duration-300 ${cn}`}
    >
      <img src={logo} className="size-[40px]" />
      <div className="font-[Itim] text-2xl tracking-tighter text-primary hidden sm:block">
        Vspo stream schedule
      </div>
      <div className="ml-auto">
        <SettingMenu />
      </div>
    </div>
  );
}
