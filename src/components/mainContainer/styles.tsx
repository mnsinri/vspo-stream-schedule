import { breakpointMediaQueries } from "src/configs";
import styled from "styled-components";

export const Background = styled.div`
  width: 100svw;
  height: 100svh;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.3s ease;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: rgba(240, 240, 240, 0.03);
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
  overflow: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;

  ${breakpointMediaQueries.desktop`
    width: 90%;
    padding: 0 3%;
  `}
`;

export const DailyStreamContainer = styled.div`
  padding: 0 20px;

  &:last-child {
    padding-bottom: 30px;
  }
`;
