import { useContext } from "react";
import { WindowSizeContext } from "../components/providers/WindowSizeProvider";

export const useWindowSize = () => {
  const context = useContext(WindowSizeContext);

  if (typeof context === "undefined") {
    throw new Error("useWindowSize must be within a VspoStreamingProvider");
  }

  return context;
};
