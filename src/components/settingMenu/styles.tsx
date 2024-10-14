import styled from "styled-components";

export const Button = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.dropdown.input.bg.normal};
  transition: 0.3s ease;
  color: ${({ theme }) => theme.dropdown.input.icon};

  &:hover {
    background-color: ${({ theme }) => theme.dropdown.input.bg.hover};
  }
`;
