import { createContext } from "react";
import { Setting, Streamer } from "types";

export type SettingAction = {
  target: Extract<
    keyof Setting,
    "isDarkTheme" | "isExpandAlways" | "isMarqueeTitle" | "isDisplayHistory"
  >;
  payload: boolean;
};

export type StreamerFilterAction = {
  target: Extract<keyof Setting["filter"], "streamerIds">;
  payload: Streamer["id"][];
};

export type Action = SettingAction | StreamerFilterAction;

export const settingContext = createContext<Setting>({} as Setting);
export const settingDispatchContext = createContext<React.Dispatch<Action>>(
  () => console.error("Dispatched action outside of an settingDispatchContext"),
);
