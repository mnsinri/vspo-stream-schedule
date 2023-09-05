import { animated, useSpring } from "@react-spring/web";
import React, { useCallback, useMemo, useState } from "react";
import { useShakeAnimation } from "../../hooks/useShakeAnimation";
import styled from "styled-components";
import { useTheme } from "../../hooks";

const Container = styled(animated.div)<{ width: number; height: number }>`
  position: relative;
  border-radius: ${(p) => p.height / 2 - 1}px;
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
`;

const Feild = styled(animated.input)<{ cursor: string }>`
  appearance: none;
  outline: none;
  border: none;
  border-radius: inherit;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s ease;
  cursor: ${(p) => p.cursor};
`;

const Knob = styled(animated.label)`
  position: absolute;
  pointer-events: none;
  background-color: #fafafa;
  border-radius: inherit;
  z-index: 1;
`;

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
  const { theme } = useTheme();
  const [isOn, setOn] = useState(initState);
  const rect = useMemo(
    () => ({
      width: size * 1.8,
      height: size,
    }),
    [size]
  );

  const [shakeStyle, shakeAnim] = useShakeAnimation(5);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) return;

      e.preventDefault();
      shakeAnim();
    },
    [disabled, shakeAnim]
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
    [disabled, onChange]
  );

  const { x, backgroundColor, opacity } = useSpring({
    from: {
      x: initState ? 1 : 0,
      backgroundColor: initState ? theme.vspo.primary : "#c7cbdf",
      opacity: disabled ? 0.5 : 1,
    },
    x: isOn ? 1 : 0,
    backgroundColor: isOn ? theme.vspo.primary : "#c7cbdf",
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
    <Container width={rect.width} height={rect.height} style={shakeStyle}>
      <Knob style={toggleStyle} />
      <Feild
        style={{ backgroundColor, opacity }}
        type="checkbox"
        onChange={onChangeStatus}
        onClick={onClick}
        checked={isOn}
        cursor={disabled ? "not-allowed" : "pointer"}
      />
    </Container>
  );
};
