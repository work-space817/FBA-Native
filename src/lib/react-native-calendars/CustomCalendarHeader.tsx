import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import CalendarSVG from "../../helpers/SVG/common/CalendarSVG";

const CustomCalendarHeader = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = format(currentDate, "MMMM yyyy");

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    <View style={styles.layout}>
      <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowStyle}>
        <CalendarSVG id="ArrowLeft" height={16} width={16} />
      </TouchableOpacity>
      <Text style={styles.currentMonth}>{currentMonth}</Text>
      <TouchableOpacity onPress={handleNextMonth} style={styles.arrowStyle}>
        <CalendarSVG id="ArrowRight" height={16} width={16} />
      </TouchableOpacity>
    </View>
  );
});

export default CustomCalendarHeader;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  currentMonth: {
    width: 115,
    textAlign: "center",
  },
  arrowStyle: {
    width: 30,
    alignItems: "center",
    paddingVertical: 3,
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
});
