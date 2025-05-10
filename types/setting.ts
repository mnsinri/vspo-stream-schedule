import { Streamer } from "./stream";

export type SwitchSettingKey = "isDarkTheme" | "isMarqueeTitle";

export type SwitchSettingState = {
  state: boolean;
  isReadOnly: boolean;
};

export type SwitchSetting = {
  [key in SwitchSettingKey]: SwitchSettingState;
};

export type FilterSetting = { streamerIds: Streamer["id"][] };

export type Setting = {
  switch: SwitchSetting;
  filter: FilterSetting;
};
