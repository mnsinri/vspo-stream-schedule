import { useContext } from "react";
import { ThemeContext } from "../components/providers/ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (typeof context === "undefined") {
    throw new Error("useTheme must be within a ThemeProvider");
  }

  return context;
};
