import styled from "styled-components";

export const Button = styled.button`
  width: 40px;
  border: 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.dropdown.input.bg.normal};
  transition: 0.3s ease;
  color: ${({ theme }) => theme.dropdown.input.icon};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.dropdown.input.bg.hover};
  }
`;
