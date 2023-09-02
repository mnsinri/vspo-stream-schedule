import { useEffect, useState } from "react";

export const useBoolStateCache = (key: string, initState: boolean) => {
  const [value, setter] = useState<boolean>(
    (() => {
      const item = localStorage.getItem(key);
      return item == null ? initState : item.toLocaleLowerCase() === "true";
    })()
  );

  useEffect(() => {
    localStorage.setItem(key, value.toString());
  }, [value]);

  return [value, setter] as const;
};
