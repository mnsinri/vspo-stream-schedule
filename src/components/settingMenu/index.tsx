import React, { ComponentProps, FC, memo } from "react";
import {
  Border,
  Dropdown,
  DropdownItem,
  ToggleButtonItem,
} from "../dropdownMenu";
import { Button } from "./styles";
import { StreamerFilter } from "../streamerFilter";
import { useDisplaySize } from "src/providers";
import { BiMenu } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useSettingInterface } from "src/hooks";
import { SettingComponentProps } from "types";

type Props = Pick<
  ComponentProps<typeof Dropdown>,
  "position" | "onOpen" | "onClose"
>;

export const SettingMenu: FC<Props> = memo(({ position, onOpen, onClose }) => {
  const settings = useSettingInterface();
  const displaySize = useDisplaySize();

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

  const SettingMenuItem = (props: SettingComponentProps) => (
    <ToggleButtonItem
      initState={props.state}
      contents={{
        icon: <props.icon size={18} />,
        text: props.label,
      }}
      onChange={props.onChange}
      disabled={props.isReadOnly}
    />
  );

  return (
    <Dropdown
      trigger={<MenuButton />}
      position={position}
      onOpen={onOpen}
      onClose={onClose}
    >
      <DropdownHeader text="Setting" />
      <SettingMenuItem {...settings.isDarkTheme} />
      <SettingMenuItem {...settings.isExpandAlways} />
      <SettingMenuItem {...settings.isMarqueeTitle} />
      <SettingMenuItem {...settings.isDisplayHistory} />
      <Border />
      {displaySize !== "mobile" && <DropdownHeader text="Filter" />}
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
