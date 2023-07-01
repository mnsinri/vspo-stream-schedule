import React, { createContext, useEffect, useMemo, useState } from "react";
import { ChildrenNode, WindowSize, WindowType } from "../../types";
import { theme } from "../../theme";

export const WindowSizeContext = createContext<WindowSize & WindowType>(null!);

export const WindowSizeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  const handleWindowSizeChange = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const windowType = useMemo<WindowType>(
    () => ({
      isMobile: size.width < theme.breakpoints.values.md,
      isDesktop: theme.breakpoints.values.lg <= size.width,
    }),
    [size]
  );

  return (
    <WindowSizeContext.Provider value={{ ...size, ...windowType }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
