import { StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { format } from "date-fns";

const DataByCalendarRange = () => {
  const { datesRange } = useSelector((store: RootState) => store.datesRange);
  console.log("datesRange: ", datesRange.startDate);

  const startingDate = format(datesRange.startDate, "d MMMM yyyy");
  const endingDate = format(datesRange.endDate, "d MMMM yyyy");

  return (
    <ComponentsLayout style={styles.layout}>
      <Text style={styles.titleText}>
        {startingDate} - {endingDate}
      </Text>
      <CalendarWithRange calendarWidth={350} style={styles.calendarLayout} />
    </ComponentsLayout>
  );
};

export default DataByCalendarRange;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 999,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  calendarLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 250,
    position: "absolute",
    left: 115,
    top: 10,
    zIndex: 999,
  },
});
