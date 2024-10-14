import React, { FC, ReactNode, useMemo } from "react";
import { ThemeProvider as TProvider } from "styled-components";
import { themes } from "src/configs";
import { useSetting } from "../settingProvider";

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const { isDarkTheme } = useSetting();

  const theme = useMemo(
    () => (isDarkTheme.state ? themes["dark"] : themes["light"]),
    [isDarkTheme.state],
  );

  return <TProvider theme={theme}>{children}</TProvider>;
};
