import { DimensionValue, StyleSheet, Text, View } from "react-native";
import React, { FC, useCallback } from "react";
import { LineChart } from "react-native-gifted-charts";
import { format, parseISO } from "date-fns";
import CustomLoadingAnimation from "../../UI/CustomLoadingAnimation";

interface ILineDiagram {
  data: any[];
  width: number;
  loading: boolean;
  currency: string;
}

const LineDiagram: FC<ILineDiagram> = ({ data, width, loading, currency }) => {
  const selectedCurrency = currency === "USD" ? "$" : "€";
  const dataPointLabelComponent = useCallback(
    (date: string, value: string, index: number) => {
      const formattedDate = format(parseISO(date), "d MMMM yyyy");
      const responsiveLabel: DimensionValue = index > 27 ? -50 : 0;
      return (
        <View style={[styles.label, { left: responsiveLabel }]}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.valueText}>
            1 {selectedCurrency} = {value} ₴
          </Text>
        </View>
      );
    },
    []
  );

  const customDataPoint = useCallback(() => {
    return <View style={{ display: "none" }} />;
  }, []);
  const minValue = Math.min(...data.map((item) => item.value));
  const maxValue = Math.max(...data.map((item) => item.value));

  const newData = data.map((item, index) => ({
    ...item,
    label: item.label.slice(8),
    dataPointLabelComponent: () =>
      dataPointLabelComponent(item.label, item.value.toString(), index),
  }));

  return (
    <>
      {width > 0 && !loading ? (
        <LineChart
          data={newData}
          showFractionalValues
          thickness={3}
          width={width * 0.75}
          spacing={25}
          maxValue={maxValue - minValue + 0.2}
          yAxisOffset={minValue - 0.1}
          yAxisLabelSuffix={" ₴ "}
          yAxisLabelWidth={42}
          curved
          hideRules
          showVerticalLines
          lineGradient
          lineGradientEndColor="rgb(255, 105, 66)"
          focusEnabled
          showStripOnFocus
          showTextOnFocus
          customDataPoint={customDataPoint}
          delayBeforeUnFocus={5000}
        />
      ) : (
        <View style={{ justifyContent: "center", height: 250, width: 300 }}>
          <CustomLoadingAnimation />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  label: {
    backgroundColor: "rgba(126,76,215,.95)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    top: -25,
  },
  dateText: {
    color: "white",
    fontSize: 11,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.5)",
  },
  valueText: {
    color: "white",
    fontSize: 10,
    paddingTop: 5,
  },
});
export default LineDiagram;
