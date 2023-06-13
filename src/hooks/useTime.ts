import { useContext } from "react";
import { TimeContext } from "../components/providers/TimeProvider";

export const useTime = () => {
  const context = useContext(TimeContext);

  if (typeof context === "undefined") {
    throw new Error("useTime must be within a TimeProvider");
  }

  return context;
};
