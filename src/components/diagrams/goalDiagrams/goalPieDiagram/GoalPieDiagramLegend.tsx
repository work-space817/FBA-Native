import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import PieDiagramLegend from "../../common/PieDiagramLegend";
import { IGoalByCategory } from "../types";
import { useTheme } from "../../../../core/themes/useTheme";

interface IGoalPieDiagramLegend {
  activeGroupByCategory: IGoalByCategory[];
  expireGroupByCategory: IGoalByCategory[];
}

const theme = useTheme();

const GoalPieDiagramLegend: FC<IGoalPieDiagramLegend> = ({
  activeGroupByCategory,
  expireGroupByCategory,
}) => {
  const activeVisibleLegend = (type: "active" | "expire") => {
    const selectedType =
      type === "active" ? activeGroupByCategory : expireGroupByCategory;
    const goals = selectedType.map((goal) => {
      const goalKey = goal.goals.map((id) => id.id);
      return (
        <PieDiagramLegend
          key={goalKey[0]}
          category={goal.summaryGoalCategory as string}
          count={goal.summaryGoalCount}
          value={goal.summaryGoalValue}
          typeOfAction={"goals"}
        />
      );
    });
    return goals;
  };
  return (
    <View style={styles.layout}>
      <View style={styles.activeGroup}>
        <Text style={[styles.text, styles.titleText]}>Active goals</Text>
        <>
          {activeVisibleLegend("active").length > 0 ? (
            activeVisibleLegend("active")
          ) : (
            <Text style={styles.text}>Goal wasn't created</Text>
          )}
        </>
      </View>
      <View style={styles.expiredGroup}>
        <Text style={[styles.text, styles.titleText]}>Expired goals</Text>
        <>
          {activeVisibleLegend("expire").length > 0 ? (
            activeVisibleLegend("expire")
          ) : (
            <Text style={styles.text}>Goal wasn't created</Text>
          )}
        </>
      </View>
    </View>
  );
};

export default GoalPieDiagramLegend;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
  },
  activeGroup: {
    paddingRight: 10,
    width: "50%",
    borderColor: theme.border,
    borderRightWidth: 1,
  },
  expiredGroup: {
    paddingLeft: 10,
    width: "50%",
    borderColor: theme.border,
    borderLeftWidth: 1,
  },
  titleText: {
    fontSize: 15,
    fontFamily: "Quicksand_700Bold",
  },
  text: {
    color: theme.text,
  },
});
