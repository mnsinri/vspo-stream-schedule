import React, { ReactNode, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ToggleButton } from "./ToggleButton";
import { MenuItem } from "./MenuItem";

const FlexEnd = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

type Contents = {
  children?: ReactNode;
  icon?: ReactNode;
  text?: string;
};

type FuncContents = (isOn: boolean) => Contents;

type Props = {
  contents: Contents | FuncContents;
  onChange: (isOn: boolean) => void;
  initState?: boolean;
  disabled?: boolean;
};

export const ToggleButtonItem: React.FC<Props> = ({
  contents,
  onChange,
  initState = false,
  disabled,
}) => {
  const [isOn, setOn] = useState(initState);
  const { children, icon, text } = useMemo(
    () => (typeof contents === "function" ? contents(isOn) : contents),
    [contents, isOn]
  );

  useEffect(() => {
    onChange(isOn);
  }, [isOn]);

  return (
    <MenuItem icon={icon} text={text}>
      {children}
      <FlexEnd>
        <ToggleButton
          size={22}
          onChange={(isOn) => setOn(isOn)}
          initState={initState}
          disabled={disabled}
        />
      </FlexEnd>
    </MenuItem>
  );
};
