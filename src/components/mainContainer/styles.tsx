import { breakpointMediaQueries } from "src/configs";
import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  transition: background-color 0.3s ease;
`;

export const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 0 5%;
  background: rgba(240, 240, 240, 0.03);
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
  overflow: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;

  ${breakpointMediaQueries.desktop`
    width: 85%;
  `}
`;

export const DailyStreamContainer = styled.div`
  &:last-child {
    padding-bottom: 30px;
  }
`;
