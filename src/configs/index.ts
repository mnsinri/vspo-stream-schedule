import { easings, SpringConfig } from "@react-spring/web";

export { baseColors } from "./baseColors";
export { breakpoints } from "./breakpoints";

export const springConfig: SpringConfig = {
  duration: 500,
  easing: easings.easeInOutSine,
};
