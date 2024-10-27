import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ObserverElement } from "./styles";

type Props<T> = {
  data: T[];
  renderItem: (props: T) => ReactNode;
  observerHeight?: number;
};

export const InViewContainer = <T,>({
  data,
  renderItem,
  observerHeight,
}: Props<T>): ReactElement => {
  const [renderDataIdx, setRenderDataIdx] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setRenderDataIdx((n) => ++n);
    });

    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
      setRenderDataIdx(1);
    };
  }, [data]);

  return (
    <>
      {data.slice(0, renderDataIdx).map((props) => renderItem(props))}
      <ObserverElement ref={ref} height={observerHeight} />
    </>
  );
};
