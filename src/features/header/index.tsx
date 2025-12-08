import logo from "@/assets/logo.png";
import { IoMoon } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { TiFilter } from "react-icons/ti";
import { TbTextDirectionRtl } from "react-icons/tb";
import { IoLogoGithub } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { ToggleButton } from "@/components/toggleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingMenu } from "../settingMenu";
import { useHeader } from "./viewModel";

export function Header() {
  const {
    isScrolled,
    onClickGithubIcon,
    themeState,
    marqueeTitleState,
    displayHistoryState,
    filterState,
    titleFilter,
    isDesktop,
  } = useHeader();
  const cn = isScrolled ? "shadow-lg border-b" : "shadow-none";

  return (
    <div
      className={`
      py-3 px-3 sm:px-5 lg:px-15 w-full 
      sticky top-0 left-0 
      flex items-center gap-2 
      rounded-b-lg bg-background z-10
      transition-shadow duration-300 ${cn}`}
    >
      <img src={logo} className="size-[40px]" />
      <div className="font-[Itim] text-2xl tracking-tighter text-primary hidden sm:block">
        Vspo stream schedule
      </div>
      <Input
        type="text"
        placeholder="Filter by stream title..."
        value={titleFilter.value}
        onChange={(e) => titleFilter.onChange(e.target.value)}
        className="max-w-xs ml-2 hidden md:block"
      />
      <div className="ml-auto flex gap-2">
        {isDesktop && (
          <div>
            <ToggleButton {...themeState} className="rounded-none rounded-l-md">
              <IoMoon className="!size-5" />
            </ToggleButton>
            <ToggleButton {...displayHistoryState} className="rounded-none">
              <MdHistory className="!size-5" />
            </ToggleButton>
            <ToggleButton {...marqueeTitleState} className="rounded-none">
              <TbTextDirectionRtl className="!size-5" />
            </ToggleButton>
            <SettingMenu
              trigger={
                <ToggleButton
                  {...filterState}
                  className="rounded-none rounded-r-md"
                >
                  <TiFilter className="!size-5" />
                </ToggleButton>
              }
              initTab="streamerFilter"
            />
          </div>
        )}
        <Button variant="outline" size="icon" onClick={onClickGithubIcon}>
          <IoLogoGithub className="!size-5" />
        </Button>
        {!isDesktop && (
          <SettingMenu
            trigger={
              <Button variant="outline" size="icon">
                <BiMenu className="!size-5" />
              </Button>
            }
            showGoBackButton
          />
        )}
      </div>
    </div>
  );
}
