import styled, { css } from "styled-components";

export const Button = styled.button<{ state: boolean }>`
  width: 40px;
  border: 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.displayHistoryButton.bg.normal};
  transition: 0.3s ease;
  color: ${({ theme, state }) =>
    state
      ? theme.displayHistoryButton.iconActive
      : theme.displayHistoryButton.icon};
  ${({ state }) =>
    state &&
    css`
      box-shadow:
        inset 3px 3px 5px #bbbbbb,
        inset -3px -3px 5px #ffffff;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.displayHistoryButton.bg.hover};
  }
`;
