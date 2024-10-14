import React from "react";
import logo from "../../logo.png";
import { SettingMenu } from "../settingMenu";
import { Container, Icon, Title, TitleText, DropdownWrapper } from "./styles";

export const Header: React.FC = () => {
  return (
    <Container>
      <Title>
        <Icon src={logo} alt="logo" />
        <TitleText>Vspo stream schedule</TitleText>
      </Title>
      <DropdownWrapper>
        <SettingMenu />
      </DropdownWrapper>
    </Container>
  );
};
