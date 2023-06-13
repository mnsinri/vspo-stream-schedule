import { useContext } from "react";
import { VspoStreamingContext } from "../components/providers/VspoStreamingProvider";

export const useVspoStreams = () => {
  const context = useContext(VspoStreamingContext);

  if (typeof context === "undefined") {
    throw new Error("useVspoStreams must be within a VspoStreamingProvider");
  }

  return context;
};
