import { breakpointMediaQueries } from "src/configs";
import styled, { css } from "styled-components";

export const Container = styled.div<{ isScrolled: boolean }>`
  padding: 5px 10px;
  margin-bottom: 5px;
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  border-radius: 0 0 10px 10px;
  z-index: 10;
  background-color: ${({ theme }) => theme.bg};
  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.2s ease-in-out;

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.2);
    `}

  ${breakpointMediaQueries.tablet`
    padding: 10px 20px;
  `}
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 40px;

  ${breakpointMediaQueries.tablet`
    justify-content: start;
    margin-left: 0px;
  `}
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

export const TitleText = styled.div`
  margin-left: 10px;
  margin-top: 8px;
  font-size: 28px;
  font-family: "Itim", cursive;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.header.text};
  display: none;

  ${breakpointMediaQueries.tablet`
    display: block;
  `}
`;

export const DropdownWrapper = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
`;
