import { useContext } from "react";
import { settingContext, settingDispatchContext } from "./context";

export const useSettings = () => useContext(settingContext);
export const useSettingDispatch = () => useContext(settingDispatchContext);
