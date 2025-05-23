import { SetStateAction, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSettings, useSettingDispatch, Setting } from "@/providers/setting";
import { Streamer } from "@types";

type Tab = "main" | "streamerFilter";
type Props = { initTab?: Tab; showGoBackButton?: boolean };

export function useSettingMenu({ initTab = "main", showGoBackButton }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const [tab, setTab] = useState<Tab>(initTab);
  const dispatch = useSettingDispatch();
  const settings = useSettings();
  const isInitialRender = useRef(true);

  function changeTab(tab: SetStateAction<Tab>) {
    if (isInitialRender) isInitialRender.current = false;
    setTab(tab);
  }

  useEffect(() => {
    if (!open) {
      changeTab(initTab);
      isInitialRender.current = true;
    }
  }, [open]);

  const theme = {
    state: settings.theme,
    options: ["system", "light", "dark"] as Setting["theme"][],
    onSelect: (v: Setting["theme"]) => {
      dispatch({ target: "theme", payload: v });
    },
  };
  const isMarqueeTitle = {
    state: settings.isMarqueeTitle,
    onChange: (v: Setting["isMarqueeTitle"]) => {
      dispatch({ target: "isMarqueeTitle", payload: v });
    },
  };
  const isDisplayHistory = {
    state: settings.isDisplayHistory,
    onChange: (v: Setting["isDisplayHistory"]) => {
      dispatch({ target: "isDisplayHistory", payload: v });
    },
  };
  const streamer = {
    state: settings.filteredStreamerIds,
    onClickTrigger: () => changeTab("streamerFilter"),
  };

  const goBack =
    showGoBackButton && !["main"].includes(tab)
      ? () => changeTab("main")
      : undefined;

  function selectStreamer(id: Streamer["id"], isSelect: boolean) {
    dispatch({
      target: "filteredStreamerIds",
      payload: [id],
      type: isSelect ? "delete" : "add",
    });
  }

  function clearStreamer() {
    dispatch({
      target: "filteredStreamerIds",
      type: "clear",
    });
  }

  return {
    isDesktop,
    open,
    setOpen,
    theme,
    isMarqueeTitle,
    isDisplayHistory,
    streamer,
    tab,
    isInitialRender: isInitialRender.current,
    goBack,
    selectStreamer,
    clearStreamer,
  };
}
