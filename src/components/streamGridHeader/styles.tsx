import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 50px;
  margin: 25px 0;
`;

export const Icon = styled.div`
  display: flex;
  gap: 5px;
  width: 30px;
  aspect-ratio: 1;
`;

export const Bar = styled.div<{ height: number; bgColor: string }>`
  width: 5px;
  height: ${({ height }) => height}px;
  margin-top: auto;
  border-radius: 0 5px 0 3px;
  background-color: ${({ bgColor }) => bgColor};
  transition: 0.5s ease-out;

  @starting-style {
    height: 0px;
  }
`;

export const DateLabel = styled.div`
  font-size: 48px;
  font-family: "Itim", cursive;
  letter-spacing: -0.02em;
  margin-top: 5px;
  color: ${({ theme }) => theme.cardHeader.text};
`;
