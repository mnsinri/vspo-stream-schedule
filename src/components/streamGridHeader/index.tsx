import React, { FC, useMemo } from "react";
import { useTheme } from "styled-components";
import {
  Bar,
  Container,
  DateContainer,
  DateLabel,
  DateLabelForOutline,
  Icon,
} from "./styles";
import { toYYYYMMDD } from "src/utils";

type Props = {
  dateString: string;
};
export const StreamGridHeader: FC<Props> = ({ dateString }) => {
  const theme = useTheme();

  const parseToViewDate = (dateString: string) => {
    const today = new Date();
    if (toYYYYMMDD(today) === dateString) {
      return "Today";
    }

    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    if (toYYYYMMDD(tomorrow) === dateString) {
      return "Tomorrow";
    }

    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
    );
    if (toYYYYMMDD(yesterday) === dateString) {
      return "Yesterday";
    }

    return dateString;
  };

  const barParams = useMemo(() => {
    const calcHeight = (max: number) => max - 7 * Math.random();
    return [
      { height: calcHeight(30), bgColor: theme.cardHeader.icon[0] },
      { height: calcHeight(20), bgColor: theme.cardHeader.icon[1] },
      { height: calcHeight(16), bgColor: theme.cardHeader.icon[2] },
    ];
  }, [theme]);

  return (
    <Container>
      <Icon>
        {barParams.map((param) => (
          <Bar key={param.height} {...param} />
        ))}
      </Icon>
      <DateContainer>
        <DateLabel>{parseToViewDate(dateString)}</DateLabel>
        <DateLabelForOutline>{parseToViewDate(dateString)}</DateLabelForOutline>
      </DateContainer>
    </Container>
  );
};
