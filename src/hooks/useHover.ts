import { useState, PointerEvent } from "react";

export const useHover = () => {
  const [hovered, setHover] = useState<boolean>(false);

  return {
    hovered,
    hoverParams: {
      onPointerOver: (e: PointerEvent<HTMLElement>) => {
        e.stopPropagation();
        setHover(true);
      },
      onPointerOut: () => setHover(false),
    },
  };
};
