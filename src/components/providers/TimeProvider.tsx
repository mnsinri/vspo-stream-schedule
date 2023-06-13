import React, {
  MutableRefObject,
  createContext,
  useEffect,
  useRef,
} from "react";
import { ChildrenNode } from "../../types";

export const TimeContext = createContext<MutableRefObject<Date>>(null!);

export const TimeProvider: React.FC<ChildrenNode> = ({ children }) => {
  const time = useRef(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      time.current = new Date();
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};
