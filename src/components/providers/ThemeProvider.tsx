import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  ChildrenNode,
  ColorTheme,
  ThemeTypes,
  ThemeContextType,
} from "../../types";
import themes from "../../theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const cacheKey = "themeType";

export const ThemeContext = createContext<ThemeContextType>({
  themeType: "light",
  theme: {} as ColorTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const [themeType, setTheme] = useState<ThemeTypes>(
    (localStorage.getItem(cacheKey) as ThemeTypes) ?? "light"
  );

  useEffect(() => {
    localStorage.setItem(cacheKey, themeType);
  }, [themeType]);

  const context = useMemo<ThemeContextType>(
    () => ({
      themeType,
      theme: themes[themeType],
      toggleTheme: () => {
        setTheme((p) => ("light" === p ? "dark" : "light"));
      },
    }),
    [themeType]
  );

  return (
    <ThemeContext.Provider value={context}>
      <StyledThemeProvider theme={themes[themeType]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
