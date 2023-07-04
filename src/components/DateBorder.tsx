import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { DateBorderProps } from "../types";
import { useTheme } from "../hooks";
import { getFormattedDate, parseToJST } from "../utils";

const Container = styled.div`
  display: flex;
  height: 50px;
`;

const Icon = styled.div`
  display: flex;
  gap: 5px;
  margin-top: auto;
  width: 30px;
  aspect-ratio: 1;
`;

const Bar = styled(animated.div)`
  margin-top: auto;
  width: 5px;
`;

const DateLabel = styled(animated.div)`
  font-size: 48px;
  font-family: "Itim", cursive;
  letter-spacing: -0.03em;
  margin-top: 5px;
`;

export const DateBorder = React.memo<DateBorderProps>(
  ({ dateString, ...props }) => {
    const { springColors, colors } = useTheme();

    const parseToViewDate = (dateString: string) => {
      const today = parseToJST(Date.now());
      if (getFormattedDate(today) === dateString) {
        return "Today";
      }

      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      if (getFormattedDate(tomorrow) === dateString) {
        return "Tomorrow";
      }

      const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      if (getFormattedDate(yesterday) === dateString) {
        return "Yesterday";
      }

      return dateString;
    };

    const calcHeight = (max: number) => max - 7 * Math.random();

    const { lh, mh, rh } = useSpring({
      from: {
        lh: 0,
        mh: 0,
        rh: 0,
      },
      to: {
        lh: calcHeight(30),
        mh: calcHeight(20),
        rh: calcHeight(16),
      },
      config: colors.config,
    });

    return (
      <Container {...props}>
        <Icon>
          <Bar
            style={{ height: lh, backgroundColor: springColors.main.primary }}
          />
          <Bar
            style={{ height: mh, backgroundColor: springColors.main.secondary }}
          />
          <Bar
            style={{ height: rh, backgroundColor: springColors.main.primary }}
          />
        </Icon>
        <DateLabel style={{ color: springColors.text.primary }}>
          {parseToViewDate(dateString)}
        </DateLabel>
      </Container>
    );
  }
);
