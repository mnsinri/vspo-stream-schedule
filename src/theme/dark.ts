import { ColorTheme } from "../types";
import { baseColors } from "../configs";

export const dark: ColorTheme = {
  text: {
    primary: baseColors.white[50],
    secondary: baseColors.white[100],
  },
  bg: {
    primary: baseColors.black[50],
    secondary: baseColors.black[100],
  },
  border: {
    primary: baseColors.white[50],
    secondary: baseColors.white[100],
  },
  vspo: {
    primary: baseColors.logo.vspo.pink,
    secondary: baseColors.logo.vspo.blue,
  },
};
