import React from "react";
import styled from "styled-components";
import { animated, useInView } from "@react-spring/web";
import { DateBorderProps, ColorLevel } from "../types";
import { getFormattedDate, parseToJST } from "../utils";
import { springConfig } from "../configs";

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

const Bar = styled(animated.div)<{ type: keyof ColorLevel }>`
  margin-top: auto;
  width: 5px;
  background-color: ${(p) => p.theme.vspo[p.type]};
  transition: background-color 0.3s ease;
`;

const DateLabel = styled(animated.div)`
  font-size: 48px;
  font-family: "Itim", cursive;
  letter-spacing: -0.03em;
  margin-top: 5px;
`;

export const DateBorder = React.memo<DateBorderProps>(
  ({ dateString, ...props }) => {
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

    const [ref, { lh, mh, rh, x }] = useInView(
      () => ({
        from: {
          lh: 0,
          mh: 0,
          rh: 0,
          x: 0,
        },
        to: {
          lh: calcHeight(30),
          mh: calcHeight(20),
          rh: calcHeight(16),
          x: 1,
        },
        delay: 200,
        config: springConfig,
      }),
      { once: true }
    );

    return (
      <Container ref={ref} {...props}>
        <Icon>
          <Bar style={{ height: lh }} type="primary" />
          <Bar style={{ height: mh }} type="secondary" />
          <Bar style={{ height: rh }} type="primary" />
        </Icon>
        <DateLabel
          style={{
            opacity: x.to({ range: [0, 0.7, 1], output: [0, 0.3, 1] }),
          }}
        >
          {parseToViewDate(dateString)}
        </DateLabel>
      </Container>
    );
  }
);
