import { StyleProp, Text, TextStyle } from "react-native";
import React, { FC } from "react";
import { format } from "date-fns/format";

interface IShowSelectedDates {
  dates: {
    startDate: string | 0 | undefined;
    endDate: string | 0 | undefined;
  };
  style: StyleProp<TextStyle>;
  dateFormat?: string;
}

const ShowSelectedDates: FC<IShowSelectedDates> = ({
  dates,
  style,
  dateFormat = "dd.MM.yyyy",
}) => {
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
  return <Text style={style}>{isDate}</Text>;
};

export default ShowSelectedDates;
