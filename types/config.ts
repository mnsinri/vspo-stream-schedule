import {
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export type BreakpointKey = "mobile" | "tablet" | "desktop";

export type BreakpointMediaQuery = (
  base: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

export type BreakpointMediaQueries = {
  [key in BreakpointKey]: BreakpointMediaQuery;
};

export type Breakpoints = {
  [key in BreakpointKey]: number;
};

export type DisplaySizeInfo = {
  [key in BreakpointKey]: boolean;
};
