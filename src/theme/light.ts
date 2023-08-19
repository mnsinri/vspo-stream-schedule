import { ColorTheme } from "../types";
import { baseColors } from "../configs";

export const light: ColorTheme = {
  text: {
    primary: baseColors.black[50],
    secondary: baseColors.black[100],
  },
  bg: {
    primary: baseColors.white[50],
    secondary: baseColors.white[100],
  },
  border: {
    primary: baseColors.black[50],
    secondary: baseColors.black[100],
  },
  vspo: {
    primary: baseColors.logo.vspo.blue,
    secondary: baseColors.logo.vspo.pink,
  },
};
