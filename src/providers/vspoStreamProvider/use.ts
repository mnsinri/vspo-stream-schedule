import { useContext } from "react";
import {
  vspoStreamContext,
  vspoStreamerContext,
  vspoStreamFilterContext,
} from "./context";

export const useVspoStreamFilter = () => useContext(vspoStreamFilterContext);
export const useVspoStream = () => useContext(vspoStreamContext);
export const useVspoStreamer = () => useContext(vspoStreamerContext);
