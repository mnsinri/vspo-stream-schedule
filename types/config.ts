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

export type ResponsiveProperty = {
  card: {
    width: number;
    height: number;
    expandedHeight: number;
    gap: { x: number; y: number };
  };
};

export type ResponsiveProperties = {
  [key in BreakpointKey]: ResponsiveProperty;
};
