import React, { ReactNode, useCallback, useEffect, useReducer } from "react";
import { displaySizeContext } from "./context";
import { DisplaySizeInfo } from "types";
import { calcBreakPoint } from "src/configs";

type Props = {
  children: ReactNode;
};

const baseState: DisplaySizeInfo = {
  mobile: false,
  tablet: false,
  desktop: false,
};

export const DisplaySizeProvider = ({ children }: Props) => {
  const displaySizeReducer = useCallback(
    (state: DisplaySizeInfo, width: number): DisplaySizeInfo => {
      const type = calcBreakPoint(width);
      if (state[type]) return state;

      return { ...baseState, [type]: true };
    },
    [],
  );

  const [displaySizeInfo, dispatch] = useReducer(
    displaySizeReducer,
    displaySizeReducer(baseState, window.innerWidth),
  );

  useEffect(() => {
    const resize = () => {
      dispatch(window.innerWidth);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <displaySizeContext.Provider value={displaySizeInfo}>
      {children}
    </displaySizeContext.Provider>
  );
};
