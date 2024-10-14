import "styled-components";

export type ThemeType = "light" | "dark";

export type CardTheme = {
  text: string;
  bg: string;
};

export type CardHeaderTheme = {
  icon: {
    0: string;
    1: string;
    2: string;
  };
  text: string;
};

export type HeaderTheme = {
  text: string;
};

export type ButtonTheme = {
  icon: string;
  bg: {
    normal: string;
    hover?: string;
    active?: string;
  };
};

export type DropdownTheme = {
  input: ButtonTheme;
  filter: {
    clear: ButtonTheme;
  };
  border: string;
  text: string;
  bg: string;
  item: {
    default: {
      bg: {
        normal: string;
        hover: string;
      };
    };
    toggle: (isOn: boolean) => ButtonTheme;
  };
};

declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    card: CardTheme;
    cardHeader: CardHeaderTheme;
    header: HeaderTheme;
    dropdown: DropdownTheme;
  }

  export type Themes = {
    [key in ThemeType]: DefaultTheme;
  };
}
