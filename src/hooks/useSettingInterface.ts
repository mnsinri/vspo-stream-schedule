import { useMemo } from "react";
import { useSetting, useSettingDispatch } from "src/providers";
import { BiExpandAlt } from "react-icons/bi";
import { TbMoonFilled, TbMarquee2, TbHistory } from "react-icons/tb";
import { SettingInterface } from "types";

export const useSettingInterface = (): SettingInterface => {
  const setting = useSetting();
  const configDispatch = useSettingDispatch();

  const isDarkTheme = useMemo(
    () => ({
      label: "Dark theme",
      icon: TbMoonFilled,
      onChange: (payload: boolean) => {
        configDispatch({ target: "isDarkTheme", payload });
      },
      ...setting.isDarkTheme,
    }),
    [setting.isDarkTheme.state],
  );

  const isExpandAlways = useMemo(
    () => ({
      label: "Expand always",
      icon: BiExpandAlt,
      onChange: (payload: boolean) => {
        configDispatch({ target: "isExpandAlways", payload });
      },
      ...setting.isExpandAlways,
    }),
    [setting.isExpandAlways.state],
  );

  const isMarqueeTitle = useMemo(
    () => ({
      label: "Marquee title",
      icon: TbMarquee2,
      onChange: (payload: boolean) => {
        configDispatch({ target: "isMarqueeTitle", payload });
      },
      ...setting.isMarqueeTitle,
    }),
    [setting.isMarqueeTitle.state],
  );

  const isDisplayHistory = useMemo(
    () => ({
      label: "Stream history",
      icon: TbHistory,
      onChange: (payload: boolean) => {
        configDispatch({ target: "isDisplayHistory", payload });
      },
      ...setting.isDisplayHistory,
    }),
    [setting.isDisplayHistory.state],
  );

  return {
    isDarkTheme,
    isExpandAlways,
    isMarqueeTitle,
    isDisplayHistory,
  };
};
