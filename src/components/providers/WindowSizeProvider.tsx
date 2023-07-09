/// <reference types="user-agent-data-types" />
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChildrenNode, WindowSize, ClientType } from "../../types";
import { theme } from "../../theme";

export const WindowSizeContext = createContext<WindowSize & ClientType>(null!);

export const WindowSizeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });
  const isMoble = useRef<boolean>(false);

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
      return /(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent);
    }
  }, []);

  useEffect(() => {
    isMoble.current = checkMoble();

    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const clientType = useMemo<ClientType>(
    () => ({
      isMobile: isMoble.current || size.width < theme.breakpoints.values.md,
      isDesktop: isMoble.current
        ? false
        : theme.breakpoints.values.lg <= size.width,
    }),
    [size]
  );

  return (
    <WindowSizeContext.Provider value={{ ...size, ...clientType }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
