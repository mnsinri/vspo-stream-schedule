import { DefaultTheme } from "styled-components";
import * as colors from "../colors";

export const lightTheme: DefaultTheme = {
  bg: colors.grey[50],
  card: {
    text: colors.grey[900],
    bg: colors.common.white,
  },
  cardHeader: {
    icon: {
      0: colors.blue[400],
      1: colors.pink[300],
      2: colors.blue[400],
    },
    text: colors.grey[900],
  },
  header: {
    text: colors.grey[900],
  },
  dropdown: {
    input: {
      icon: colors.grey[900],
      bg: {
        normal: "transparent",
        hover: colors.grey[200],
      },
    },
    border: colors.grey[500],
    text: colors.grey[900],
    bg: colors.grey[100],
    item: {
      default: {
        bg: {
          normal: "transparent",
          hover: colors.grey[200],
        },
      },
      toggle: (isOn) =>
        isOn
          ? {
              icon: colors.grey[50],
              bg: {
                normal: colors.blue[400],
              },
            }
          : {
              icon: colors.grey[50],
              bg: {
                normal: colors.blue[100],
              },
            },
    },
    filter: {
      clear: {
        icon: colors.grey[900],
        bg: {
          normal: "transparent",
          hover: colors.grey[300],
          active: colors.grey[200],
        },
      },
    },
  },
  displayHistoryButton: {
    icon: colors.grey[900],
    iconActive: colors.blue[400],
    bg: {
      normal: "transparent",
      hover: colors.grey[200],
    },
  },
};
