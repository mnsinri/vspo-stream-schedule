import { breakpointMediaQueries } from "src/configs";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: auto;
  padding: 7px 14px;
  overflow-y: scroll;
  scrollbar-width: none;
  max-height: 120px;

  ${breakpointMediaQueries.tablet`
    width: 254px;
    overflow-y: hidden;
    max-height: max-content;
  `}
`;

export const Button = styled.button`
  margin-left: auto;

  border: 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.dropdown.filter.clear.bg.normal};
  transition: 0.3s ease;
  color: ${({ theme }) => theme.dropdown.input.icon};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.dropdown.filter.clear.bg.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.dropdown.filter.clear.bg.active};
  }
`;

export const StreamerIcon = styled.img<{ isClicked: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  border: 2px outset
    ${({ theme, isClicked }) =>
      isClicked ? theme.cardHeader.icon[0] : "transparent"};
  box-shadow: ${({ isClicked }) =>
    isClicked
      ? "none"
      : `-1px -1px 3px rgba(240, 240, 240, 0.5), 
        1.5px 1.5px 3px rgba(15, 15, 15, 0.5)`};

  &:hover {
    border-radius: 40%;
  }

  ${({ theme, isClicked }) => breakpointMediaQueries.tablet`
    height: 50px;
    width: 50px;
    border: 3px outset ${isClicked ? theme.cardHeader.icon[0] : "transparent"};
    box-shadow: ${
      isClicked
        ? "none"
        : `-2px -2px 6px rgba(240, 240, 240, 0.5), 
         3px 3px 6px rgba(15, 15, 15, 0.5)`
    };
  `}
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 22px;
  position: relative;
  overflow-x: hidden;
`;

export const PreviewStreamerIcon = styled.img<{ n: number }>`
  position: absolute;
  top: 0;
  right: ${({ n }) => 13 * n}px;
  z-index: ${({ n }) => n};
  height: calc(100% - 2px);
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.dropdown.bg};
  border-radius: 50%;
  object-fit: cover;
  transition: 0.2s ease-in-out;
  opacity: 1;
`;
