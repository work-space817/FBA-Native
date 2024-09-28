import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { FC, useState } from "react";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import { CalendarList } from "react-native-calendars";
import { format, parseISO } from "date-fns";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import CustomButton from "../../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { RootState } from "../../store";
import { ICalendarDatesRangeActionType } from "../../store/reducers/calendarReducers/types";

export interface IDateRange {
  startDate?: string;
  endDate?: string;
}

interface ICalendarWithRange {
  maskStyle?: ViewStyle;
  style?: ViewStyle;
  onConfirm: (e: IDateRange) => void;
}

const CalendarWithRange: FC<ICalendarWithRange> = ({
  maskStyle,
  style,
  onConfirm,
}) => {
  const dispatch = useDispatch();
  const today = new Date();
  const maxDate = format(today, "yyyy-MM-dd");

  const { isCalendarOpen } = useSelector(
    (store: RootState) => store.datesRange
  );

  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [boundaryDates, setBoundaryDates] = useState<IDateRange>({});

  let updatedSelectedDates = { ...selectedDates };
  const selectedKeys = Object.keys(updatedSelectedDates);

  const handleDayPress = (day: DateData) => {
    updatedSelectedDates = {};
    const { dateString } = day;
    const startDate = dateString;
    setBoundaryDates({ startDate });

    if (selectedKeys.length === 1) {
      const [existingDate] = selectedKeys;
      if (new Date(existingDate) < new Date(dateString)) {
        const startDate = existingDate;
        const endDate = dateString;
        addDatesBetweenRange(existingDate, dateString);
        setBoundaryDates({ startDate, endDate });
      } else {
        const startDate = dateString;
        const endDate = existingDate;
        addDatesBetweenRange(dateString, existingDate);
        setBoundaryDates({ startDate, endDate });
      }
    } else {
      addSingleDate(dateString);
    }
    setSelectedDates(updatedSelectedDates);
  };

  const addSingleDate = (dateString: string) => {
    updatedSelectedDates[dateString] = {
      ...getMarkedDateObject,
      startingDay: true,
      endingDay: true,
    };
  };

  const addDatesBetweenRange = (startDate: string, endDate: string) => {
    const dates: any[] = [];
    let currentDate = parseISO(startDate);

    while (currentDate <= parseISO(endDate)) {
      dates.push(format(currentDate, "yyyy-MM-dd"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    dates.forEach((date) => {
      updatedSelectedDates[date] = { ...getMarkedDateObject };
    });
    updatedSelectedDates[startDate].startingDay = true;
    updatedSelectedDates[endDate].endingDay = true;
    setSelectedDates(updatedSelectedDates);
    return dates;
  };

  const getMarkedDateObject: MarkingProps = {
    color: "rgba(126,76,215,.99)",
    textColor: "rgba(255,255,255,.7)",
  };

  const onDismissByBackground = () => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_CALENDAR_OPEN,
      payload: false,
    });
  };
  const onStopPropagation = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      {isCalendarOpen && (
        <TouchableOpacity style={maskStyle} onPressIn={onDismissByBackground}>
          <ComponentsLayout style={[styles.calendarLayout, style]}>
            <TouchableOpacity onPress={onStopPropagation}>
              <CalendarList
                futureScrollRange={0}
                showScrollIndicator={true}
                horizontal={true}
                calendarWidth={255}
                calendarHeight={320}
                onDayPress={handleDayPress}
                firstDay={1}
                maxDate={maxDate}
                markingType={"period"}
                markedDates={selectedDates}
                theme={{ calendarBackground: "transparent" }}
              />
              <CustomButton
                style={styles.confirmButton}
                title={"Confirm"}
                theme={
                  Object.keys(boundaryDates).length < 1 ? "none" : "primary"
                }
                onPress={() => onConfirm(boundaryDates)}
                disabled={Object.keys(boundaryDates).length < 1}
              />
            </TouchableOpacity>
          </ComponentsLayout>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CalendarWithRange;

const styles = StyleSheet.create({
  calendarLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 250,
    zIndex: 100,
  },
  confirmButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
