import { easings, SpringConfig } from "@react-spring/web";

export { breakpoints } from "./breakpoints";

export const springConfig: SpringConfig = {
  duration: 500,
  easing: easings.easeInOutSine,
};
