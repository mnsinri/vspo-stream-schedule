import { useContext } from "react";
import { vspoStreamContext, vspoStreamerContext } from "./context";

export const useVspoStream = () => useContext(vspoStreamContext);
export const useVspoStreamer = () => useContext(vspoStreamerContext);
