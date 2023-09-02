import { useContext } from "react";
import { ConfigContext } from "../components/providers/ConfigProvider";

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (typeof context === "undefined") {
    throw new Error("useConfig must be within a VspoStreamingProvider");
  }

  return context;
};
