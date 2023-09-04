import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (
  callback = (timestamp: DOMHighResTimeStamp) => {}
) => {
  const ref = useRef<number>(0);

  const loop = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      ref.current = requestAnimationFrame(loop);
      callback(timestamp);
    },
    [callback]
  );

  useEffect(() => {
    ref.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(ref.current);
  }, [loop]);
};
