import { SpringConfig, SpringValue } from "@react-spring/web";
import {
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export type Colorlevel = {
  50: string;
  100: string;
  200: string;
};

export type BaseColors = {
  black: Colorlevel;
  white: Colorlevel;
  logoColors: {
    vspo: {
      pink: string;
      blue: string;
    };
    youtube: string;
    twitch: string;
  };
};

export type SpringColorLevel = {
  primary: SpringValue<string>;
  secondary: SpringValue<string>;
};

export type ColorLevel = {
  primary: string;
  secondary: string;
};

export type SpringColors = {
  main: SpringColorLevel;
  base: SpringColorLevel;
  text: SpringColorLevel;
};

export type ThemeColors = {
  main: ColorLevel;
  base: ColorLevel;
  text: ColorLevel;
  config: SpringConfig;
};

export type Theme = {
  breakpoint: Breakpoints;
  colors: BaseColors;
};

export type Breakpoint = (
  base: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

export type Breakpoints = {
  base: Breakpoint;
  sm: Breakpoint;
  md: Breakpoint;
  lg: Breakpoint;
  xl: Breakpoint;
  xll: Breakpoint;
};

export type ThemeContextType = {
  colors: ThemeColors;
  springColors: SpringColors;
  toggleTheme: () => void;
  isDark: Boolean;
};
