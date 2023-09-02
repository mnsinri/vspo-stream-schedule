import { useEffect, useState } from "react";

export const useBoolStateCache = (key: string, initState: boolean) => {
  const [value, setter] = useState<boolean>(
    localStorage.getItem(key)?.toLocaleLowerCase() === "true" ?? initState
  );

  useEffect(() => {
    localStorage.setItem(key, value.toString());
  }, [value]);

  return [value, setter] as const;
};
