import {
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
  css,
} from "styled-components";
import {
  BreakpointMediaQueries,
  BreakpointValues,
  Breakpoints,
} from "../types";

const values: BreakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

const mediaQueries: BreakpointMediaQueries = {
  xs: (
    xs: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    ${css(xs, ...interpolations)}
  `,
  sm: (
    sm: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${values.sm}px) {
      ${css(sm, ...interpolations)}
    }
  `,
  md: (
    md: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${values.md}px) {
      ${css(md, ...interpolations)}
    }
  `,
  lg: (
    lg: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${values.lg}px) {
      ${css(lg, ...interpolations)}
    }
  `,
  xl: (
    xl: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${values.xl}px) {
      ${css(xl, ...interpolations)}
    }
  `,
  xxl: (
    xxl: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (min-width: ${values.xxl}px) {
      ${css(xxl, ...interpolations)}
    }
  `,
};

export const breakpoints: Breakpoints = {
  values,
  mediaQueries,
};
