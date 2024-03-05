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

interface ICalendarWithRange {
  buttonStyle?: ViewStyle;
  style: ViewStyle;
  calendarWidth: number;
}

const CalendarWithRange: FC<ICalendarWithRange> = ({
  buttonStyle,
  style,
  calendarWidth,
}) => {
  const dispatch = useDispatch();
  const today = new Date();
  const maxDate = format(today, "yyyy-MM-dd");

  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});
  const [boundaryDates, setBoundaryDates] = useState({});
  const [minDate, setMinDate] = useState<string>("");

  const [showCalendarList, setShowCalendarList] = useState(false);
  // console.log("selectedDates: ", selectedDates);

  let updatedSelectedDates = { ...selectedDates };
  const selectedKeys = Object.keys(updatedSelectedDates);

  const onActive = () => {
    setShowCalendarList(true);
  };
  const handleDayPress = (day: DateData) => {
    const { dateString } = day;
    setMinDate(dateString);

    if (selectedKeys.length > 1) {
      updatedSelectedDates = {};
    }
    if (selectedKeys.length === 1) {
      setMinDate("");
      const startDate = selectedKeys[0];
      const endDate = dateString;
      setBoundaryDates({ startDate, endDate });
      const datesBetween = getDatesBetweenRange(startDate, endDate);
    }
    updatedSelectedDates[dateString] = {
      color: "rgba(126,76,215,.99)",
      textColor: "rgba(255,255,255,.7)",
      endingDay: true,
    };
    setSelectedDates(updatedSelectedDates);
  };

  const getDatesBetweenRange = (startDate: string, endDate: string) => {
    const dates: any[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const rangeDates = dates.forEach((date) => {
      updatedSelectedDates[date] = getMarkedDateObject();
    });
    updatedSelectedDates[startDate].startingDay = true;
    updatedSelectedDates[endDate].endingDay = true;
    setSelectedDates(updatedSelectedDates);
  };

  const getMarkedDateObject = () => ({
    color: "rgba(126,76,215,.99)",
    textColor: "rgba(255,255,255,.7)",
  });

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
      {calendarWidth > 0 && showCalendarList && (
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
            minDate={minDate}
            maxDate={maxDate}
            markingType={"period"}
            markedDates={selectedDates}
            theme={{ calendarBackground: "transparent" }}
          />
          <CustomButton
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            title={"Confirm"}
            theme={Object.keys(boundaryDates).length < 2 ? "none" : "primary"}
            onPress={onConfirm}
            disabled={Object.keys(boundaryDates).length < 2}
          />
        </ComponentsLayout>
      )}
    </>
  );
};

export default CalendarWithRange;

const styles = StyleSheet.create({});
