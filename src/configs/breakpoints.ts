import { BreakpointMediaQueries, Breakpoints, BreakpointKey } from "types";
import { css } from "styled-components";

export const breakpoints: Breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export const breakpointMediaQueries: BreakpointMediaQueries = {
  mobile: (mobile, ...interpolations) => css`
    ${css(mobile, ...interpolations)}
  `,
  tablet: (tablet, ...interpolations) => css`
    @media (min-width: ${breakpoints.tablet}px) {
      ${css(tablet, ...interpolations)}
    }
  `,
  desktop: (desktop, ...interpolations) => css`
    @media (min-width: ${breakpoints.desktop}px) {
      ${css(desktop, ...interpolations)}
    }
  `,
};

export const calcBreakPoint = (width: number): BreakpointKey => {
  if (breakpoints.desktop <= width) return "desktop";
  if (breakpoints.tablet <= width) return "tablet";
  return "mobile";
};
