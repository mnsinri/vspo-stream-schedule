import { ColorTheme } from "../types";
import { common, grey, pink, blue } from "../colors";

export const light: ColorTheme = {
  text: {
    primary: common.black,
  },
  bg: {
    primary: grey[50],
    secondary: grey[100],
  },
  hoverd: {
    primary: grey[200],
    secondary: grey[300],
  },
  border: {
    primary: grey[900],
  },
  vspo: {
    primary: blue[400],
    secondary: pink[300],
  },
};
