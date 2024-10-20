import { ResponsiveProperty } from "types";

const mobile: ResponsiveProperty = {
  card: {
    width: 130,
    height: 73.125,
    expandedHeight: 97.5,
    gap: {
      x: 10,
      y: 20,
    },
  },
};

const notMobile: ResponsiveProperty = {
  card: {
    width: 320,
    height: 180,
    expandedHeight: 240,
    gap: {
      x: 20,
      y: 40,
    },
  },
};

export const responsiveProperties = {
  mobile,
  tablet: notMobile,
  desktop: notMobile,
};
