import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { DateBorderProps } from "../types";
import { useTheme, useTime } from "../hooks";
import { theme } from "../theme";
import { getFormatedDate, parseJST } from "../utils";

const Container = styled.div``;

const MainBorder = styled(animated.div)`
  position: absolute;
  left: 0;
  width: 100vw;
  height: 25px;
  z-index: -1;
`;

const SubBorder = styled(animated.div)`
  position: absolute;
  left: 60%;
  margin-top: 15px;
  width: 40%;
  height: 15px;
  border-radius: 8px 0 0 8px;
  z-index: -1;
`;

const LabelContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DateLabel = styled(animated.div)`
  position: absolute;
  left: 30px;
  top: -16px;
  font-size: 40px;
  font-family: "Itim", cursive;

  ${theme.breakpoint.md`
    left: 60px;
  `}
`;

const toTextShadow = (color: string) =>
  `2px 2px 1px ${color}, -2px 2px 1px ${color}, 2px -2px 1px ${color},
  -2px -2px 1px ${color}, 2px 0px 1px ${color}, 0px 2px 1px ${color},
  -2px 0px 1px ${color}, 0px -2px 1px ${color}`;

export const DateBorder: React.FC<DateBorderProps> = ({
  dateString,
  ...props
}) => {
  const { springColors, colors } = useTheme();
  const time = useTime();

  const parseDateforView = (dateString: string) => {
    const today = parseJST(time.current.getTime());
    if (getFormatedDate(today) === dateString) {
      return "Today";
    }

    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    if (getFormatedDate(tomorrow) === dateString) {
      return "Tomorrow";
    }

    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );
    if (getFormatedDate(yesterday) === dateString) {
      return "Yesterday";
    }

    return dateString;
  };

  const { textShadow } = useSpring({
    textShadow: toTextShadow(colors.base.primary),
  });

  return (
    <Container {...props}>
      <MainBorder style={{ backgroundColor: springColors.main.primary }} />
      <SubBorder style={{ backgroundColor: springColors.main.secondary }} />
      <LabelContainer>
        <DateLabel
          style={{
            color: springColors.text.primary,
            textShadow,
          }}
        >
          {parseDateforView(dateString)}
        </DateLabel>
      </LabelContainer>
    </Container>
  );
};
