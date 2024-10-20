import React, { ReactNode } from "react";
import { IconContainer, Item, ItemText } from "./styles";
import { CSSObject } from "styled-components";

type Props = {
  children?: ReactNode;
  contents?: {
    icon?: ReactNode;
    text?: string;
  };
  style?: CSSObject;
  hoverable?: boolean;
  onClick?: () => void;
};

export const DropdownItem: React.FC<Props> = ({
  children,
  contents = {},
  style,
  hoverable = false,
  onClick,
}) => {
  const { icon, text } = contents;

  return (
    <Item onClick={onClick} hoverable={!!onClick || hoverable} style={style}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {text && <ItemText>{text}</ItemText>}
      {children}
    </Item>
  );
};
