import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { IGoalCircleStatisticList } from "../types";
import { useTheme } from "../../../../core/themes/useTheme";

interface IPieDiagramLabels {
  labelState: "expired" | "active";
  goalGroup: IGoalCircleStatisticList[];
  totalItems: number;
}

const theme = useTheme();

const PieDiagramLabels: FC<IPieDiagramLabels> = ({
  labelState,
  goalGroup,
  totalItems,
}) => {
  const goalStateStyle =
    labelState === "expired" ? styles.labelExpired : styles.labelActive;

  const amountItems = goalGroup.length > 0 ? goalGroup[0].summaryCount : 0;
  const percent = (amountItems / totalItems) * 100;
  const isPercent = isNaN(percent) ? 0 : percent.toFixed(2);
  return (
    <View style={[styles.labels, goalStateStyle]}>
      <Text
        style={styles.titleText}
      >{`${amountItems} ${labelState} goals`}</Text>
      <Text style={styles.percent}>({isPercent} %)</Text>
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
    color: theme.text,
  },
  percent: {
    fontSize: 14,
    color: theme.subText,
    fontFamily: "Quicksand_600SemiBold",
  },
});
