import { IconType } from "react-icons";
import { Streamer } from "./stream";

export type SettingKey =
  | "isDarkTheme"
  | "isExpandAlways"
  | "isMarqueeTitle"
  | "isDisplayHistory";

export type SettingState = {
  state: boolean;
  isReadOnly: boolean;
};

export type FilterInfo = {
  streamerIds: Streamer["id"][];
};

export type Setting = {
  [key in SettingKey]: SettingState;
} & {
  filter: FilterInfo;
};

export type SettingComponentProps = {
  label: string;
  icon: IconType;
  onChange: (state: boolean) => void;
} & SettingState;

export type SettingInterface = {
  [key in SettingKey]: SettingComponentProps;
};
