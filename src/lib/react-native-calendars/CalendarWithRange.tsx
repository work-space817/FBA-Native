import { StyleSheet, ViewStyle } from "react-native";
import React, { FC, useState } from "react";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { CalendarList } from "react-native-calendars";
import { format } from "date-fns";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import CustomButton from "../../components/UI/CustomButton";
import CalendarSVG from "../../helpers/SVG/common/CalendarSVG";
import { useDispatch } from "react-redux";
import { ICalendarDatesRangeActionType } from "../../store/reducers/types";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

interface ICalendarWithRange {
  buttonStyle?: ViewStyle;
  style: ViewStyle;
}

const CalendarWithRange: FC<ICalendarWithRange> = ({ buttonStyle, style }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const maxDate = format(today, "yyyy-MM-dd");

  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [boundaryDates, setBoundaryDates] = useState({});
  const [showCalendarList, setShowCalendarList] = useState(false);
  // console.log("boundaryDates: ", boundaryDates);
  // console.log("selectedDates: ", selectedDates);

  let updatedSelectedDates = { ...selectedDates };
  const selectedKeys = Object.keys(updatedSelectedDates);

  const onActive = () => {
    setShowCalendarList(true);
  };

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
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().split("T")[0]);
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

  const onConfirm = () => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DATES_RANGE,
      payload: boundaryDates,
    });
    setShowCalendarList(false);
  };
  return (
    <>
      <CustomButton
        title={""}
        theme="none"
        onPress={onActive}
        style={[{ borderRadius: 10, padding: 10 }, buttonStyle]}
      >
        <CalendarSVG id="Calendar" width={18} height={18} />
      </CustomButton>
      {showCalendarList && (
        <ComponentsLayout style={style}>
          <CalendarList
            pastScrollRange={6}
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
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            title={"Confirm"}
            theme={Object.keys(boundaryDates).length < 1 ? "none" : "primary"}
            onPress={onConfirm}
            disabled={Object.keys(boundaryDates).length < 1}
          />
        </ComponentsLayout>
      )}
    </>
  );
};

export default CalendarWithRange;

const styles = StyleSheet.create({});
