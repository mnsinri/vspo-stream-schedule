import { Streamer } from "./stream";

export type SettingState = {
  state: boolean;
  isReadOnly: boolean;
};

export type FilterInfo = {
  streamerIds: Streamer["id"][];
};

export type Setting = {
  isDarkTheme: SettingState;
  isExpandAlways: SettingState;
  isMarqueeTitle: SettingState;
  isDisplayHistory: SettingState;
  filter: FilterInfo;
};
