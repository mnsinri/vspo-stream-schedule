/// <reference types="user-agent-data-types" />
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChildrenNode, WindowSize, ClientType } from "../../types";
import { breakpoints } from "../../configs";

export const WindowSizeContext = createContext<WindowSize & ClientType>(null!);

export const WindowSizeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowSizeChange = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const checkMoble = useCallback(() => {
    if (navigator.userAgentData) {
      return navigator.userAgentData.mobile;
    } else {
      return (
        /android|ipod|ipad|iphone|macintosh/.test(
          navigator.userAgent.toLowerCase()
        ) && "ontouchend" in document
      );
    }
  }, []);

  useEffect(() => {
    setIsMobile(checkMoble());

    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const clientType = useMemo<ClientType>(
    () => ({
      isMobile,
      isPhoneSize: size.width < breakpoints.values.md,
      isTabletSize: breakpoints.values.md <= size.width,
      isDesktopSize: breakpoints.values.lg <= size.width,
    }),
    [size, isMobile]
  );

  return (
    <WindowSizeContext.Provider value={{ ...size, ...clientType }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
