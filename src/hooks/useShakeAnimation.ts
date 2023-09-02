import { useSpring, useSpringRef } from "@react-spring/web";

export const useShakeAnimation = (x: number) => {
  const api = useSpringRef();
  const style = useSpring({
    ref: api,
    x: 0,
  });

  const shake = () => {
    api.start({
      x: 0,
      from: { x },
      config: {
        mass: 1,
        tension: 500,
        friction: 15,
      },
    });
  };

  return [style, shake] as const;
};
