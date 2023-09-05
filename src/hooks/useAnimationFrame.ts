import { useEffect, useRef } from "react";

export const useAnimationFrame = (
  callback = (timestamp: DOMHighResTimeStamp) => {}
) => {
  const ref = useRef<number>(0);
  const rafCallback = useRef<(timestamp: DOMHighResTimeStamp) => void>(null!);

  useEffect(() => {
    rafCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const loop = (timestamp: DOMHighResTimeStamp) => {
      rafCallback.current(timestamp);
      ref.current = requestAnimationFrame(loop);
    };
    ref.current = requestAnimationFrame(loop);
    return () => {
      ref.current && cancelAnimationFrame(ref.current);
    };
  }, []);
};
