import { createContext, Dispatch } from "react";
import { Setting, SettingAction } from "./schema";

export const settingContext = createContext<Setting>({} as Setting);
export const settingDispatchContext = createContext<Dispatch<SettingAction>>(
  () => console.error("Dispatched action outside of an settingDispatchContext")
);
