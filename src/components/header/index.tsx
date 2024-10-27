import React, { FC } from "react";
import logo from "../../logo.png";
import { DisplayHistoryButton } from "../displayHistoryButton";
import { SettingMenu } from "../settingMenu";
import { Container, Icon, Title, TitleText, DropdownWrapper } from "./styles";

type Props = {
  isScrolled: boolean;
  onOpenMenu?: () => void;
  onCloseMenu?: () => void;
};

export const Header: FC<Props> = ({ isScrolled, onOpenMenu, onCloseMenu }) => {
  return (
    <Container isScrolled={isScrolled}>
      <Title>
        <Icon src={logo} alt="logo" />
        <TitleText>Vspo stream schedule</TitleText>
      </Title>
      <DropdownWrapper>
        <DisplayHistoryButton />
        <SettingMenu
          position={{ y: 40 }}
          onOpen={onOpenMenu}
          onClose={onCloseMenu}
        />
      </DropdownWrapper>
    </Container>
  );
};
