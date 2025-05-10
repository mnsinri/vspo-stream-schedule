import { useEffect, useRef } from "react";

export function useThrottle<U extends unknown[]>(
  fn: (...args: U) => void,
  ms = 1000
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<U>(null!);
  const callNext = useRef<boolean>(false);

  const throttleFn = (...args: U) => {
    if (timeout.current === undefined) {
      fn(...args);
      function timeoutCallback() {
        if (callNext.current) {
          fn(...nextArgs.current);
          callNext.current = false;
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      }
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      callNext.current = true;
      nextArgs.current = args;
    }
  };

  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = undefined;
      }
      callNext.current = false;
    },
    []
  );

  return throttleFn;
}
