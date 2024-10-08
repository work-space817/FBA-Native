import { DimensionValue, StyleSheet, Text, View } from "react-native";
import React, { FC, useCallback } from "react";
import { LineChart } from "react-native-gifted-charts";
import { format, parseISO } from "date-fns";
import CustomLoadingAnimation from "../../UI/CustomLoadingAnimation";
import { useTheme } from "../../../core/themes/useTheme";

interface ILineDiagram {
  data: any[];
  width: number;
  loading: boolean;
  currency: string;
}
const theme = useTheme();

const LineDiagram: FC<ILineDiagram> = ({ data, width, loading, currency }) => {
  const selectedCurrency = currency === "USD" ? "$" : "€";
  const dataPointLabelComponent = useCallback(
    (date: string, value: string, index: number) => {
      const formattedDate = format(parseISO(date), "d MMMM yyyy");
      const responsiveLabel: DimensionValue = index > 27 ? -70 : 0;
      return (
        <View style={[styles.label, { left: responsiveLabel }]}>
          <View style={styles.dateTextBorder}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          <Text style={styles.valueText}>
            1 {selectedCurrency} = {value} ₴
          </Text>
        </View>
      );
    },
    []
  );

  const minValue = Math.min(...data.map((item) => item.value));
  const maxValue = Math.max(...data.map((item) => item.value));

  const newData = data.map((item, index) => ({
    ...item,
    label: item.label.slice(8),
    newValue: item.value, //!lib bug
    newLabel: item.label, //!lib bug
    index: index,
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
          yAxisColor={theme.text}
          xAxisColor={theme.text}
          yAxisTextStyle={{ color: theme.text }}
          xAxisLabelTextStyle={{ color: theme.text }}
          curved
          hideRules
          showVerticalLines
          lineGradient
          lineGradientEndColor={theme.orange}
          showTextOnFocus
          hideDataPoints
          pointerConfig={{
            pointer1Color: "transparent",
            pointerStripWidth: 5,
            pointerStripUptoDataPoint: true,
            pointerStripColor: theme.purple,
            pointerLabelWidth: 110,
            activatePointersOnLongPress: true,
            pointerLabelComponent: (item: any) => {
              return dataPointLabelComponent(
                item[0].newLabel,
                item[0].newValue,
                item[0].index
              );
            },
          }}
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
    backgroundColor: "rgba(126,76,215,.7)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
  dateText: {
    color: "white",
    fontSize: 11,
    paddingBottom: 5,
  },
  dateTextBorder: {
    borderColor: theme.border,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  valueText: {
    color: "white",
    fontSize: 10,
    paddingTop: 5,
  },
});
export default LineDiagram;
