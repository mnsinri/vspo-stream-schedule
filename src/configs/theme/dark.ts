import { DefaultTheme } from "styled-components";
import * as colors from "../colors";

export const darkTheme: DefaultTheme = {
  bg: colors.grey[900],
  card: {
    text: colors.grey[100],
    bg: colors.grey[800],
  },
  cardHeader: {
    icon: {
      0: colors.pink[300],
      1: colors.blue[400],
      2: colors.pink[300],
    },
    text: colors.grey[100],
  },
  header: {
    text: colors.grey[100],
  },
  dropdown: {
    input: {
      icon: colors.grey[100],
      bg: {
        normal: "transparent",
        hover: colors.grey[700],
      },
    },
    border: colors.grey[400],
    text: colors.grey[100],
    bg: colors.grey[800],
    item: {
      default: {
        bg: {
          normal: "transparent",
          hover: colors.grey[700],
        },
      },
      toggle: (isOn) =>
        isOn
          ? {
              icon: colors.grey[200],
              bg: {
                normal: colors.pink[300],
              },
            }
          : {
              icon: colors.grey[200],
              bg: {
                normal: colors.pink[300],
              },
            },
    },
    filter: {
      clear: {
        icon: colors.grey[100],
        bg: {
          normal: "transparent",
          hover: colors.grey[600],
          active: colors.grey[700],
        },
      },
    },
  },
  displayHistoryButton: {
    icon: colors.grey[100],
    iconActive: colors.pink[300],
    bg: {
      normal: "transparent",
      hover: colors.grey[700],
    },
    shadow: [colors.grey[900], colors.grey[800]],
  },
};
