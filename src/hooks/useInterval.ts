import { useEffect } from "react";

export const useInterval = (fn: () => boolean, ms: number) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      if (fn()) clearInterval(timerId);
    }, ms);

    if (fn()) clearInterval(timerId);

    return () => clearInterval(timerId);
  }, []);
};
