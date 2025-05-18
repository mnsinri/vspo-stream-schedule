import { getSystemTheme } from "@/lib/utils";
import { useSettingDispatch, useSettings } from "@/providers/setting";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, isMarqueeTitle, isDisplayHistory, filteredStreamerIds } =
    useSettings();
  const dispatch = useSettingDispatch();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    const el = document.scrollingElement;
    if (!el) return;

    const onScroll = () => setIsScrolled(el.scrollTop > 0);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onClickGithubIcon() {
    window.open("https://github.com/mnsinri/vspo-stream-schedule");
  }

  const isDark = (() => {
    if (theme === "system") return getSystemTheme() === "dark";
    return theme === "dark";
  })();
  const themeState = {
    pressed: isDark,
    onPressedChange: (state: boolean) => {
      dispatch({
        target: "theme",
        payload: state ? "dark" : "light",
      });
    },
    description: isDark ? "Light mode" : "Dark mode",
  };

  const marqueeTitleState = {
    pressed: isMarqueeTitle,
    onPressedChange: (state: boolean) =>
      dispatch({
        target: "isMarqueeTitle",
        payload: state,
      }),
    description: "Marquee title",
  };

  const displayHistoryState = {
    pressed: isDisplayHistory,
    onPressedChange: (state: boolean) =>
      dispatch({
        target: "isDisplayHistory",
        payload: state,
      }),
    description: "Display history",
  };

  const filterState = {
    pressed: !!filteredStreamerIds.length,
    description: "Filter by streamer",
  };

  return {
    isScrolled,
    onClickGithubIcon,
    themeState,
    marqueeTitleState,
    displayHistoryState,
    filterState,
    isDesktop,
  };
}
