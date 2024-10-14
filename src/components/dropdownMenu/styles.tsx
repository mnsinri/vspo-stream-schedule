import styled from "styled-components";
import { animated } from "@react-spring/web";

export const MenuButton = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.dropdown.input.bg.normal};
  transition: 0.3s ease;
  color: ${({ theme }) => theme.dropdown.input.icon};

  &:hover {
    background-color: ${({ theme }) => theme.dropdown.input.bg.hover};
  }
`;

export type DropdownContainerProps = {
  width?: number;
};
export const DropdownContainer = styled(animated.ol)<DropdownContainerProps>`
  box-sizing: border-box;
  position: absolute;
  width: ${({ width }) => width ?? 250}px;
  border: 5px solid ${({ theme }) => theme.dropdown.bg};
  border-radius: 7px;
  box-shadow: 0px 3px 6px 2px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.dropdown.bg};
  padding: 2px;
  color: ${({ theme }) => theme.dropdown.text};
  z-index: 100;
`;

export const Border = styled.hr`
  background-color: ${({ theme }) => theme.dropdown.border};
  height: 1px;
  border: none;
  margin: 7px 0px;
  padding: 0 5px;
`;
