import { PointerEvent, useState } from "react";

export const useHover = () => {
  const [hovering, setHover] = useState<boolean>(false);

  return {
    hovering,
    hoverParams: {
      onPointerOver: (e: PointerEvent<HTMLElement>) => {
        e.stopPropagation();
        setHover(true);
      },
      onPointerOut: () => setHover(false),
    },
  };
};
