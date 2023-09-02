import React from "react";
import styled from "styled-components";
import { SettingMenu } from "./settingMenu";
import { breakpoints } from "../configs";
import logo from "../logo.png";
import { useWindowSize } from "../hooks";

const Container = styled.div`
  width: 100%;
  height: 80px;
  // position: sticky;
  // top: 0;
  // left: 0;
  display: flex;
  align-items: center;

  ${breakpoints.mediaQueries.md`
    height: 100px;
  `}
`;

const Title = styled.div<{ isPhone: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: ${(p) => (p.isPhone ? "40px" : "0px")};

  ${breakpoints.mediaQueries.md`
    justify-content: start;
  `}
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;

  ${breakpoints.mediaQueries.md`
    width: 50px;
    height: 50px;
  `}
`;

const TitleText = styled.div`
  margin-left: 10px;
  margin-top: 8px;
  font-size: 28px;
  font-family: "Itim", cursive;
  letter-spacing: -0.05em;
`;

const Wrapper = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
`;

export const Header: React.FC = () => {
  const { isPhoneSize } = useWindowSize();
  return (
    <Container>
      <Title isPhone={isPhoneSize}>
        <Icon src={logo} alt="logo" />
        {!isPhoneSize && <TitleText>Vspo stream schedule</TitleText>}
      </Title>
      <Wrapper>
        <SettingMenu />
      </Wrapper>
    </Container>
  );
};
