import React, { ReactNode, useCallback, useEffect, useReducer } from "react";
import { DeepPartial, Setting } from "types";
import { Action, settingContext, settingDispatchContext } from "./context";
import { checkMobile } from "src/utils";

type Props = {
  children: ReactNode;
};

const storageKey = "setting";
const isMobile = checkMobile();

const getLocalSetting = (): DeepPartial<Setting> => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "{}");
  } catch {
    return {};
  }
};

const setLocalSetting = (setting: Setting) => {
  localStorage.setItem(storageKey, JSON.stringify(setting));
};

export const getInitSetting = () => {
  const localSetting = getLocalSetting();

  const setting: Setting = {
    isDarkTheme: {
      state: localSetting.isDarkTheme?.state ?? false,
      isReadOnly: false,
    },
    isExpandAlways: {
      state: isMobile || (localSetting.isExpandAlways?.state ?? false),
      isReadOnly: isMobile,
    },
    isMarqueeTitle: {
      state: localSetting.isMarqueeTitle?.state ?? false,
      isReadOnly: true, // TODO marquee
    },
    isDisplayHistory: {
      state: localSetting.isDisplayHistory?.state ?? false,
      isReadOnly: false,
    },
    filter: {
      streamerIds: localSetting.filter?.streamerIds ?? [],
    },
  };

  return setting;
};

export const SettingProvider = ({ children }: Props) => {
  const settingReducer = useCallback(
    (prev: Setting, { target, payload }: Action) => {
      if (
        "isDarkTheme" === target ||
        "isExpandAlways" === target ||
        "isMarqueeTitle" === target ||
        "isDisplayHistory" === target
      ) {
        const setting = prev[target];
        if (setting.isReadOnly) return prev;

        return { ...prev, [target]: { ...setting, state: payload } };
      }

      if ("streamerIds" === target) {
        return { ...prev, filter: { [target]: payload } };
      }

      return prev;
    },
    [],
  );

  const [setting, dispatch] = useReducer(settingReducer, getInitSetting());

  useEffect(() => {
    const onUnmount = () => {
      setLocalSetting(setting);
    };
    onUnmount();
    window.addEventListener("beforeunload", onUnmount);

    return () => {
      onUnmount();
      window.removeEventListener("beforeunload", onUnmount);
    };
  }, [setting]);

  return (
    <settingContext.Provider value={setting}>
      <settingDispatchContext.Provider value={dispatch}>
        {children}
      </settingDispatchContext.Provider>
    </settingContext.Provider>
  );
};
