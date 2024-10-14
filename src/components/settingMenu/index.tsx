import React, { FC, memo } from "react";
import {
  Border,
  Dropdown,
  DropdownItem,
  ToggleButtonItem,
} from "../dropdownMenu";
import { Button } from "./styles";
import { StreamerFilter } from "../streamerFilter";
import { useDisplaySize, useSetting, useSettingDispatch } from "src/providers";
import { BiExpandAlt, BiMenu } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { TbMoonFilled, TbMarquee2, TbHistory } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

export const SettingMenu: FC = memo(() => {
  const setting = useSetting();
  const configDispatch = useSettingDispatch();
  const { mobile } = useDisplaySize();

  const MenuButton = memo(() => (
    <Button>
      <BiMenu size={28} />
    </Button>
  ));

  const GithubLink = memo(() => (
    <DropdownItem
      contents={{
        icon: <FaGithub size={18} />,
        text: "Github",
      }}
      onClick={() =>
        window.open("https://github.com/mnsinri/vspo-stream-schedule")
      }
    />
  ));

  const DropdownHeader = memo(({ text }: { text: string }) => (
    <DropdownItem contents={{ text }} style={{ fontSize: 13 }} />
  ));

  const ThemeSetting = memo(() => (
    <ToggleButtonItem
      initState={setting.isDarkTheme.state}
      contents={{
        icon: <TbMoonFilled size={18} />,
        text: "Dark theme",
      }}
      onChange={(payload) => configDispatch({ target: "isDarkTheme", payload })}
      disabled={setting.isDarkTheme.isReadOnly}
    />
  ));

  const ExpandSetting = memo(() => (
    <ToggleButtonItem
      initState={setting.isExpandAlways.state}
      contents={{
        icon: <BiExpandAlt size={18} />,
        text: "Expand always",
      }}
      onChange={(payload) =>
        configDispatch({ target: "isExpandAlways", payload })
      }
      disabled={setting.isExpandAlways.isReadOnly}
    />
  ));

  const MarqueeSetting = memo(() => (
    <ToggleButtonItem
      initState={setting.isMarqueeTitle.state}
      contents={{
        icon: <TbMarquee2 size={18} />,
        text: "Marquee title",
      }}
      onChange={(payload) =>
        configDispatch({ target: "isMarqueeTitle", payload })
      }
      disabled={setting.isMarqueeTitle.isReadOnly}
    />
  ));

  const HistorySetting = memo(() => (
    <ToggleButtonItem
      initState={setting.isDisplayHistory.state}
      contents={{
        icon: <TbHistory size={18} />,
        text: "Stream history",
      }}
      onChange={(payload: boolean) =>
        configDispatch({ target: "isDisplayHistory", payload })
      }
      disabled={setting.isDisplayHistory.isReadOnly}
    />
  ));

  return (
    <Dropdown trigger={<MenuButton />}>
      <DropdownHeader text="Setting" />
      <ThemeSetting />
      <ExpandSetting />
      <MarqueeSetting />
      <HistorySetting />
      <Border />
      {!mobile && <DropdownHeader text="Filter" />}
      <StreamerFilter
        triggerContents={{
          icon: <IoIosArrowBack size={18} />,
          text: "Streamer",
        }}
        width={300}
        position={{ x: -310, y: -50 }}
        entry={{ from: "right" }}
      />
      <Border />
      <GithubLink />
    </Dropdown>
  );
});
