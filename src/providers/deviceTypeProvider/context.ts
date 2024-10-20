import { createContext } from "react";
import { BreakpointKey } from "types";

export const displaySizeContext = createContext<BreakpointKey>("desktop");
