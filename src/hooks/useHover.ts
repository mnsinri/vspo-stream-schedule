import { useState } from "react";

export const useHover = () => {
  const [hovered, setHover] = useState<boolean>(false);
  return {
    hovered,
    hoverSpread: {
      onPointerOver: (e: any) => {
        e.stopPropagation();
        setHover(true);
      },
      onPointerOut: () => setHover(false),
    },
  };
};
