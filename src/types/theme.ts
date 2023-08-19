export type Colorlevel = {
  50: string;
  100: string;
  200: string;
};

export type BaseColors = {
  black: Colorlevel;
  white: Colorlevel;
  logo: {
    vspo: {
      pink: string;
      blue: string;
    };
    youtube: string;
    twitch: string;
    twitCasting: string;
  };
};

export type ColorLevel = {
  primary: string;
  secondary?: string;
};

export type ColorTheme = {
  text: ColorLevel;
  bg: ColorLevel;
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
  toggleTheme: () => void;
};
