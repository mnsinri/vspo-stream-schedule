import styled from "styled-components";
import { breakpointMediaQueries } from "src/configs";

export const Container = styled.div<{ gap: number; minHeight: number }>`
  min-height: ${({ minHeight }) => minHeight}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${({ gap }) => gap}px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${breakpointMediaQueries.tablet`
    gap: 40px;
  `}
`;

export const DummyCard = styled.div`
  width: 160px;

  ${breakpointMediaQueries.tablet`
    width: 320px;
  `}
`;
