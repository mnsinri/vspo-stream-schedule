import { useEffect, useMemo, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  const handleWindowSizeChange = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const winSize = useMemo(
    () => ({
      x: size[0],
      y: size[1],
      isMobile: size[0] < 768,
      isDesktop: 1024 <= size[0],
    }),
    [size]
  );

  return winSize;
};
