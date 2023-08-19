import {
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export type BreakpointValues = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type BreakpointMediaQuery = (
  base: CSSObject | TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

export type BreakpointMediaQueries = {
  xs: BreakpointMediaQuery;
  sm: BreakpointMediaQuery;
  md: BreakpointMediaQuery;
  lg: BreakpointMediaQuery;
  xl: BreakpointMediaQuery;
  xxl: BreakpointMediaQuery;
};

export type Breakpoints = {
  values: BreakpointValues;
  mediaQueries: BreakpointMediaQueries;
};
