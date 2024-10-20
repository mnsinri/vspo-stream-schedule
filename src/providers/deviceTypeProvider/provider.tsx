import React, { ReactNode, useEffect, useState } from "react";
import { displaySizeContext } from "./context";
import { BreakpointKey } from "types";
import { calcBreakPoint } from "src/configs";

type Props = {
  children: ReactNode;
};

export const DisplaySizeProvider = ({ children }: Props) => {
  const [type, setType] = useState<BreakpointKey>("desktop");

  useEffect(() => {
    const resize = () => {
      setType(calcBreakPoint(window.innerWidth));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <displaySizeContext.Provider value={type}>
      {children}
    </displaySizeContext.Provider>
  );
};
