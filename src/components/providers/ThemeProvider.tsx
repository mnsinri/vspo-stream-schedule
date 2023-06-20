import React, { createContext, useCallback, useMemo, useState } from "react";
import {
  ChildrenNode,
  SpringColors,
  ThemeColors,
  ThemeContextType,
} from "../../types";
import { theme } from "../../theme";
import { easings, useSpring } from "@react-spring/web";
import { useWindowSize } from "../../hooks";

export const ThemeContext = createContext<ThemeContextType>({
  colors: {} as ThemeColors,
  springColors: {} as SpringColors,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [isDark, setDark] = useState<Boolean>(false);
  const { isMobile } = useWindowSize();

  const config = {
    duration: isMobile ? 0 : 500,
    easing: easings.easeInOutSine,
  };

  const main = {
    primary: isDark ? theme.colors.pink : theme.colors.blue,
    secondary: isDark ? theme.colors.blue : theme.colors.pink,
  };
  const base = {
    primary: isDark ? theme.colors.black[50] : theme.colors.white[50],
    secondary: isDark ? theme.colors.black[100] : theme.colors.white[100],
  };
  const text = {
    primary: isDark ? theme.colors.white[50] : theme.colors.black[50],
    secondary: isDark ? theme.colors.white[100] : theme.colors.black[100],
  };

  const colors = {
    main,
    base,
    text,
    config,
  };

  const springColors = {
    main: useSpring({ ...main, config }),
    base: useSpring({ ...base, config }),
    text: useSpring({ ...text, config }),
  };

  const toggleTheme = useCallback(() => setDark((isDark) => !isDark), []);

  const context = useMemo<ThemeContextType>(
    () => ({
      colors,
      springColors,
      toggleTheme,
      isDark,
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
