import { createContext } from "react";
import { DisplaySizeInfo } from "types";

export const displaySizeContext = createContext<DisplaySizeInfo>(
  {} as DisplaySizeInfo,
);
