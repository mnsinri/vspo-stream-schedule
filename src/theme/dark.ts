import { ColorTheme } from "../types";
import { common, grey, pink, blue } from "../colors";

export const dark: ColorTheme = {
  text: {
    primary: common.white,
  },
  bg: {
    primary: grey[900],
    secondary: grey[800],
  },
  hoverd: {
    primary: grey[700],
    secondary: grey[600],
  },
  border: {
    primary: grey[100],
  },
  vspo: {
    primary: pink[300],
    secondary: blue[400],
  },
};
