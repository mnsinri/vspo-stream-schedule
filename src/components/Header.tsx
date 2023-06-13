import React from "react";
import styled from "styled-components";
import { ThemeButton, GithubLinkButton } from "./buttons";
import { theme } from "../theme";
import logo from "../logo.png";
import { useTheme, useWindowSize } from "../hooks";
import { animated } from "@react-spring/web";

const Container = styled.div`
  width: 100%;
  height: 80px;
  // position: sticky;
  // top: 0;
  // left: 0;
  display: flex;
  align-items: center;

  ${theme.breakpoint.md`
    height: 100px;
  `}
`;

const Title = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;

  ${theme.breakpoint.md`
    justify-content: start;
  `}
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;

  ${theme.breakpoint.md`
    width: 40px;
    height: 40px;
    margin-left: 35px;
  `}
`;

const TitleText = styled(animated.div)`
  margin-left: 10px;
  margin-top: 2px;
  font-size: 28px;
  font-family: "Itim", cursive;
  letter-spacing: -0.05em;
`;

const Wrapper = styled.div`
  width: 120px;
  display: flex;
  justify-content: center;
`;

export const Header: React.FC = () => {
  const { isMobile } = useWindowSize();
  const { springColors } = useTheme();
  return (
    <Container>
      <Title>
        <Icon src={logo} />
        {!isMobile ? (
          <TitleText style={{ color: springColors.text.primary }}>
            Vspo stream schedule
          </TitleText>
        ) : null}
      </Title>
      <Wrapper style={{ order: isMobile ? -1 : 0 }}>
        <GithubLinkButton />
      </Wrapper>
      <Wrapper>
        <ThemeButton />
      </Wrapper>
    </Container>
  );
};
