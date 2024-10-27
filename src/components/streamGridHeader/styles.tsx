import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 50px;
  margin: 25px 0;
  position: sticky;
  top: 70px;
  z-index: 2;
`;

export const Icon = styled.div`
  display: flex;
  gap: 5px;
  width: 30px;
`;

export const Bar = styled.div<{ height: number; bgColor: string }>`
  width: 5px;
  height: ${({ height }) => height}px;
  margin-top: auto;
  border-radius: 0 5px 0 3px;
  background-color: ${({ bgColor }) => bgColor};
  outline: 3px solid ${({ theme }) => theme.bg};
  transition:
    height 0.5s ease-out,
    outline 0.3s 0.2s ease-out;

  @starting-style {
    height: 0px;
    outline: 0px solid transparent;
  }
`;

export const DateContainer = styled.div`
  position: relative;
  margin-top: 5px;
`;

export const DateLabel = styled.div`
  font-size: 48px;
  font-family: "Itim", cursive;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.cardHeader.text};
  transition: color 0.3s ease;
`;

export const DateLabelForOutline = styled(DateLabel)`
  position: absolute;
  top: 0;
  z-index: -1;
  -webkit-text-stroke: 5px ${({ theme }) => theme.bg};
  transition: -webkit-text-stroke 0.3s ease;
`;
