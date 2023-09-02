import React, { CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";

const Item = styled.li<{ hoverable: boolean }>`
  cursor: pointer;
  list-style: none;
  display: flex;
  transition: background-color 0.3s ease;
  padding: 7px 14px;
  border-radius: 7px;

  ${(p) =>
    p.hoverable &&
    css`
      &:hover {
        background-color: ${(p) => p.theme.hoverd.secondary};
      }
    `}
`;

const IconContainer = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const ItemText = styled.span``;

type Props = {
  children?: ReactNode;
  icon?: ReactNode;
  text?: string;
  onClick?: () => void;
  style?: CSSProperties;
};

export const MenuItem: React.FC<Props> = ({
  children,
  icon,
  text,
  onClick,
  style,
}) => {
  return (
    <Item onClick={onClick} hoverable={!!onClick} style={style}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {text && <ItemText>{text}</ItemText>}
      {children}
    </Item>
  );
};
