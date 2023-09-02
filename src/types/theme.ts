export type ColorLevel = {
  primary: string;
  secondary?: string;
};

export type ColorTheme = {
  text: ColorLevel;
  bg: ColorLevel;
  hoverd: ColorLevel;
  border: ColorLevel;
  vspo: ColorLevel;
};

export type Theme = {
  dark: ColorTheme;
  light: ColorTheme;
};

export type ThemeTypes = keyof Theme;

export type ThemeContextType = {
  themeType: ThemeTypes;
  theme: ColorTheme;
  setThemeDark: (isOn: boolean) => void;
};
