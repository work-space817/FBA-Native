import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { addMonths, format, subMonths } from "date-fns";
import ArrowsSVG from "../../helpers/SVG/UI/ArrowsSVG";

const CustomCalendarHeader = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = format(currentDate, "MMMM yyyy");
  console.log("currentMonth: ", currentMonth);

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    <View style={styles.layout}>
      <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowStyle}>
        <ArrowsSVG id="ArrowLeft" height={16} width={16} />
      </TouchableOpacity>
      <Text style={styles.currentMonth}>{currentMonth}</Text>
      <TouchableOpacity onPress={handleNextMonth} style={styles.arrowStyle}>
        <ArrowsSVG id="ArrowRight" height={16} width={16} />
      </TouchableOpacity>
    </View>
  );
});

export default CustomCalendarHeader;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentMonth: {
    width: 115,
    textAlign: "center",
  },
  arrowStyle: {
    width: 30,
    alignItems: "center",
    paddingVertical: 3,
  },
});
