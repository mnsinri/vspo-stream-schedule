import styled, { css } from "styled-components";

export const Item = styled.li<{ hoverable: boolean }>`
  list-style: none;
  display: flex;
  gap: 5px;
  align-items: center;
  transition: background-color 0.3s ease;
  background-color: ${({ theme }) => theme.dropdown.item.default.bg.normal};
  padding: 7px 14px;
  border-radius: 7px;
  cursor: pointer;

  ${(p) =>
    p.hoverable &&
    css`
      &:hover {
        background-color: ${({ theme }) =>
          theme.dropdown.item.default.bg.hover};
      }
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemText = styled.span`
  line-height: 1.2;
`;
