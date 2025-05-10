import { Stream, Streamer } from "@types";
import { createContext } from "react";

export const vspoStreamContext = createContext<Stream[]>([]);
export const vspoStreamerContext = createContext<Streamer[]>([]);
