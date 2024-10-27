import React, {
  ComponentProps,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ToggleButton } from "../../toggleButton";
import { DropdownItem } from "../dropdownItem";
import { FlexEnd } from "./styles";

type Contents = {
  icon?: ReactNode;
  text?: string;
};

type Props = {
  contents: Contents | ((isOn: boolean) => Contents);
  children?: ReactNode | ((isOn: boolean) => ReactNode);
} & Pick<ComponentProps<typeof DropdownItem>, "style"> &
  ComponentProps<typeof ToggleButton>;

export const ToggleButtonItem: React.FC<Props> = ({
  contents: _contents,
  children: _children,
  onChange: _onChange,
  initState = false,
  size = 22,
  style,
  disabled,
}) => {
  const [isOn, setOn] = useState(initState);
  const { contents, children } = useMemo(
    () => ({
      contents: typeof _contents === "function" ? _contents(isOn) : _contents,
      children: typeof _children === "function" ? _children(isOn) : _children,
    }),
    [_contents, isOn],
  );

  const onChange = useCallback(
    (isOn: boolean) => {
      setOn(isOn);
      _onChange(isOn);
    },
    [_onChange],
  );

  return (
    <DropdownItem contents={contents} style={{ ...style, cursor: "default" }}>
      {children}
      <FlexEnd>
        <ToggleButton
          size={size}
          onChange={onChange}
          initState={initState}
          disabled={disabled}
        />
      </FlexEnd>
    </DropdownItem>
  );
};
