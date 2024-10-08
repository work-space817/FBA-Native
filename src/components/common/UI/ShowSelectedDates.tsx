import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import React, { FC, memo } from "react";
import { format } from "date-fns/format";
import { useTheme } from "../../../core/themes/useTheme";

interface IShowSelectedDates extends TextProps {
  dates: {
    startDate: string | 0 | undefined;
    endDate: string | 0 | undefined;
  };
  dateFormat?: string;
}

const theme = useTheme();

const ShowSelectedDates: FC<IShowSelectedDates> = memo(
  ({ dates, dateFormat = "dd.MM.yyyy", ...props }) => {
    let isDate;
    const isStartDate = dates.startDate ? dates.startDate : 0;
    const isEndDate = dates.endDate ? dates.endDate : 0;
    const startingDate = format(isStartDate, dateFormat);
    const endingDate = format(isEndDate, dateFormat);

    if (isStartDate !== 0 && isEndDate !== 0) {
      isDate = `${startingDate} - ${endingDate}`;
    } else if (isStartDate !== 0 && isEndDate == 0) {
      isDate = `${startingDate}`;
    } else {
      isDate = `All time`;
    }
    return (
      <Text {...props} style={[styles.titleText, props.style]}>
        {isDate}
      </Text>
    );
  }
);

export default ShowSelectedDates;

const styles = StyleSheet.create({
  titleText: {
    color: theme.text,
  },
});
