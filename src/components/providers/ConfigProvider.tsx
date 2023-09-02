import React, { createContext, createRef } from "react";
import { ChildrenNode } from "../../types";
import { useBoolStateCache } from "../../hooks";

type ConfigSetter = {
  setExpandAlways: React.Dispatch<React.SetStateAction<boolean>>;
  setMarquee: React.Dispatch<React.SetStateAction<boolean>>;
};

type Config = {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  isExpandAlways: boolean;
  isMarquee: boolean;
};

type ContextType = {
  config: Config;
  configSetter: ConfigSetter;
};

const initState = {
  config: {
    scrollContainerRef: null!,
    isExpandAlways: true,
    isMarquee: true,
  },
  configSetter: {
    setExpandAlways: null!,
    setMarquee: null!,
  },
};

export const ConfigContext = createContext<ContextType>(initState);
const scrollContainerRef = createRef<HTMLDivElement>();

export const ConfigProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [isExpandAlways, setExpandAlways] = useBoolStateCache(
    "isExpandAlways",
    initState.config.isExpandAlways
  );

  const [isMarquee, setMarquee] = useBoolStateCache(
    "isMarquee",
    initState.config.isMarquee
  );

  return (
    <ConfigContext.Provider
      value={{
        config: { scrollContainerRef, isExpandAlways, isMarquee },
        configSetter: { setExpandAlways, setMarquee },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
