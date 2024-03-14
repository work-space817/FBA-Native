import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { format } from "date-fns";

const DataByCalendarRange = () => {
  const { datesRange } = useSelector((store: RootState) => store.datesRange);
  // console.log("datesRange: ", datesRange);

  const isEndDate = datesRange.endDate ? datesRange.endDate : 0;
  console.log("isEndDate: ", isEndDate);

  const startingDate = format(datesRange?.startDate, "d MMMM yyyy");
  const endingDate = format(isEndDate, "d MMMM yyyy");

  const isEndingDate =
    isEndDate !== 0 ? `${startingDate} - ${endingDate}` : `${startingDate}`;

  return (
    <ComponentsLayout style={styles.layout}>
      <Text style={styles.titleText}>{isEndingDate}</Text>
      <CalendarWithRange
        style={styles.calendarLayout}
        onDismiss={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ComponentsLayout>
  );
};

export default DataByCalendarRange;

const styles = StyleSheet.create({
  layout: {
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  calendarLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 250,
    // position: "absolute",
    left: 115,
    top: 10,
    zIndex: 3,
  },
});
