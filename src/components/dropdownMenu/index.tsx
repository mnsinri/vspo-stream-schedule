import React, {
  FC,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTransition } from "@react-spring/web";
import { DropdownContainer, DropdownContainerProps } from "./styles";

type Direction = "top" | "right" | "bottom" | "left";

type Position = {
  x: number;
  y: number;
};

type EntryConfig = {
  from: Direction;
  dist: number;
};

type Props = {
  trigger: ReactElement;
  position?: Partial<Position>;
  entry?: Partial<EntryConfig>;
  children?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
} & DropdownContainerProps;

const calcPosition = ({
  x = 0,
  y = 10,
  from = "top",
  dist = 10,
}: Position & EntryConfig): Position => {
  switch (from) {
    case "top":
      return { x, y: y - dist };
    case "bottom":
      return { x, y: y + dist };
    case "right":
      return { x: x + dist, y };
    case "left":
      return { x: x - dist, y };
  }
};

export const Dropdown: FC<Props> = memo(
  ({
    trigger,
    width,
    position = {},
    entry = {},
    children,
    onOpen,
    onClose,
  }) => {
    const [isOpen, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const refDropdown = useRef<HTMLOListElement>(null!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const refBtn = useRef<HTMLDivElement>(null!);

    const { x = 0, y = 30 } = position;
    const { from = "top", dist = 10 } = entry;
    const initPosition = calcPosition({ x, y, from, dist });

    const checkClicksOutside = useCallback(
      (e: MouseEvent) => {
        if (!(e.target instanceof Node)) return;

        const isOutSideMenu = !refDropdown.current?.contains(e.target);
        const isOutSideBtn = !refBtn.current?.contains(e.target);

        if (isOutSideMenu && isOutSideBtn) setOpen(false);
      },
      [setOpen],
    );

    useEffect(() => {
      if (isOpen) {
        onOpen?.();
        document.addEventListener("mousedown", checkClicksOutside);
      } else {
        onClose?.();
      }

      return () =>
        document.removeEventListener("mousedown", checkClicksOutside);
    }, [isOpen]);

    const config = { duration: 250 };
    const transitions = useTransition(isOpen, {
      from: { opacity: 0, ...initPosition, config },
      enter: { opacity: 1, x, y, config },
      leave: { opacity: 0, ...initPosition, config },
    });

    return (
      <>
        <div ref={refBtn} onClick={() => setOpen((o) => !o)}>
          {trigger}
        </div>
        {transitions(
          (style, isOpen) =>
            isOpen && (
              <DropdownContainer ref={refDropdown} style={style} width={width}>
                {children}
              </DropdownContainer>
            ),
        )}
      </>
    );
  },
);

export * from "./dropdownItem";
export * from "./toggleButtonItem";
export { Border } from "./styles";
