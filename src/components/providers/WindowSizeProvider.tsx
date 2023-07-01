import React, { createContext, useEffect, useMemo, useState } from "react";
import { ChildrenNode, WindowSize } from "../../types";
import { theme } from "../../theme";

export const WindowSizeContext = createContext<WindowSize>(null!);

export const WindowSizeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleWindowSizeChange = () => {
    setX(window.innerWidth);
    setY(window.innerHeight);
  };
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const winSize = useMemo<WindowSize>(
    () => ({
      x,
      y,
      isMobile: x < theme.breakpoints.values.md,
      isDesktop: theme.breakpoints.values.lg <= x,
    }),
    [x, y]
  );
  return (
    <WindowSizeContext.Provider value={winSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};
