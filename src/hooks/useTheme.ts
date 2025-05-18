import { useEffect } from "react";
import { useSettings } from "@/providers/setting";
import { getSystemTheme } from "@/lib/utils";

export function useTheme() {
  const { theme } = useSettings();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      root.classList.add(getSystemTheme());
      return;
    }

    root.classList.add(theme);
  }, [theme]);
}
