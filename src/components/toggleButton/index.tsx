import React, { useCallback, useMemo, useState } from "react";
import { useSpring } from "@react-spring/web";
import { useTheme } from "styled-components";
import { Area, Container, Knob } from "./styles";

type Props = {
  onChange: (on: boolean) => void;
  size?: number;
  initState?: boolean;
  disabled?: boolean;
};

export const ToggleButton: React.FC<Props> = ({
  onChange,
  size = 30,
  initState = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const [isOn, setOn] = useState(initState);
  const rect = useMemo(
    () => ({
      width: size * 1.8,
      height: size,
    }),
    [size],
  );

  const onChangeStatus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      setOn(e.target.checked);
      onChange(e.target.checked);
    },
    [disabled, onChange],
  );

  const { x, btnBg, knobBg, opacity } = useSpring({
    from: {
      x: initState ? 1 : 0,
      btnBg: theme.dropdown.item.toggle(initState).bg.normal,
      knobBg: theme.dropdown.item.toggle(initState).icon,
      opacity: disabled ? 0.5 : 1,
    },
    x: isOn ? 1 : 0,
    btnBg: theme.dropdown.item.toggle(isOn).bg.normal,
    knobBg: theme.dropdown.item.toggle(isOn).icon,
    opacity: disabled ? 0.5 : 1,
    config: {
      duration: 150,
    },
  });

  const toggleStyle = useMemo(() => {
    const knobSize = size * 0.7;
    const margin = (size - knobSize) / 2;
    const range = [0, 0.35, 0.65, 1];
    const step = (rect.width - size) / 3;
    const d = 2;

    return {
      top: x.to({
        range,
        output: [1, 2, 2, 1].map((n) => n * margin),
      }),
      left: x.to({
        range,
        output: [0, step + d, 2 * step - d, 3 * step].map((n) => n + margin),
      }),
      width: x.to({
        range,
        output: [1, 1.4, 1.4, 1].map((n) => n * knobSize),
      }),
      height: x.to({
        range,
        output: [1, 0.55, 0.55, 1].map((n) => n * knobSize),
      }),
    };
  }, [size]);

  return (
    <Container width={rect.width} height={rect.height}>
      <Area
        style={{ backgroundColor: btnBg, opacity }}
        type="checkbox"
        onChange={onChangeStatus}
        checked={isOn}
        disabled={disabled}
      />
      <Knob style={{ ...toggleStyle, backgroundColor: knobBg }} />
    </Container>
  );
};
