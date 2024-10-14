import { useContext } from "react";
import { settingContext, settingDispatchContext } from "./context";

export const useSetting = () => useContext(settingContext);
export const useSettingDispatch = () => useContext(settingDispatchContext);
