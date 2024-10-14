import { breakpointMediaQueries } from "src/configs";
import styled, { css, keyframes } from "styled-components";

const baseTransition = css`
  transition: 0.2s ease;
`;

type StyleProps = {
  isExpand: boolean;
};

export const Card = styled.div<StyleProps>`
  width: 160px;
  height: ${({ isExpand }) => (isExpand ? 120 : 90)}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.card.bg};
  color: ${({ theme }) => theme.card.text};
  position: relative;
  overflow: hidden;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  ${baseTransition}

  @starting-style {
    opacity: 0;
  }

  ${({ isExpand }) => breakpointMediaQueries.tablet`
    width: 320px;
    height: ${isExpand ? 240 : 180}px;
    border-radius: 10px;
  `}
`;

export const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1.777777778;
  position: relative;
  z-index: 1;
`;

export const StreamInfo = styled.div<StyleProps>`
  width: ${({ isExpand }) => (isExpand ? 50 : 20)}px;
  height: 20px;
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background-color: ${({ theme }) => theme.card.bg};
  border-radius: 10px;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
  z-index: 10;
  ${baseTransition}

  ${({ isExpand }) => breakpointMediaQueries.tablet`
    width: ${isExpand ? 85 : 30}px;
    height: 28px;
    gap: 4px;
    border-radius: 15px;
    box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.25);
  `}
`;

export const PlatformIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  ${breakpointMediaQueries.tablet`
    font-size: 20px;
  `}
`;

const stateTextFadeIn = keyframes`
  0%, 30% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;
export const StateText = styled.div<StyleProps>`
  font-weight: bold;
  font-size: 11px;
  animation: ${stateTextFadeIn} 0.3s ease-in-out;
  ${({ isExpand }) =>
    !isExpand &&
    css`
      display: none;
    `};

  ${breakpointMediaQueries.tablet`
    font-size: 16px;
  `}
`;

export const Details = styled.div`
  height: 30px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0 3px;

  ${breakpointMediaQueries.tablet`
    height: 60px;
    gap: 6px;
    padding: 0 6px;
  `}
`;

export const StreamerIcon = styled.img`
  height: 25px;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;

  ${breakpointMediaQueries.tablet`
    height: 50px;
  `}
`;

const textContainerFadeIn = keyframes`
  0%,
  25% {
    opacity: 0;
    display: none;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const TextContainer = styled.div<StyleProps>`
  width: 125px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ isExpand }) =>
    isExpand &&
    css`
      animation: ${textContainerFadeIn} 0.3s ease-in-out;
    `};

  ${breakpointMediaQueries.tablet`
    width: 250px;
  `}
`;

export const Name = styled.div`
  font-size: 7.5px;
  transform-origin: 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${breakpointMediaQueries.tablet`
    font-size: 15px;
  `}
`;