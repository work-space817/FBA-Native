import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { IGoalByCategory, IGoalCircleStatisticList } from "../types";

interface IPieDiagramLabels {
  labelState: "expired" | "active";
  innerData: IGoalByCategory[];
  goalGroup: IGoalCircleStatisticList[];
  totalItems: number;
}

const PieDiagramLabels: FC<IPieDiagramLabels> = ({
  labelState,
  innerData,
  goalGroup,
  totalItems,
}) => {
  const goalStateStyle =
    labelState === "expired" ? styles.labelExpired : styles.labelActive;

  const amountItems = goalGroup.length > 0 ? goalGroup[0].summaryCount : 0;
  const percent = ((amountItems / totalItems) * 100).toFixed(2);

  return (
    <View style={[styles.labels, goalStateStyle]}>
      <Text
        style={styles.titleText}
      >{`${amountItems} ${labelState} goals`}</Text>
      <Text style={styles.percent}>({percent} %)</Text>
    </View>
  );
};

export default PieDiagramLabels;

const styles = StyleSheet.create({
  labels: {
    width: 120,
    height: 50,
    position: "absolute",
  },
  labelExpired: {
    left: 15,
    top: 250,
  },
  labelActive: {
    left: 250,
    top: 40,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  percent: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: "Quicksand_600SemiBold",
  },
});
