import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import PieDiagramLegend from "../../common/PieDiagramLegend";
import { IGoalByCategory } from "../types";

interface IGoalPieDiagramLegend {
  activeGroupByCategory: IGoalByCategory[];
  expireGroupByCategory: IGoalByCategory[];
}

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
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          paddingRight: 10,
          width: "50%",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRightWidth: 1,
        }}
      >
        <Text style={styles.titleText}>Active goals</Text>
        <>
          {activeVisibleLegend("active").length > 0 ? (
            activeVisibleLegend("active")
          ) : (
            <Text>Goal wasn't created</Text>
          )}
        </>
      </View>
      <View
        style={{
          paddingLeft: 10,
          width: "50%",
        }}
      >
        <Text style={styles.titleText}>Expired goals</Text>
        <>
          {activeVisibleLegend("expire").length > 0 ? (
            activeVisibleLegend("expire")
          ) : (
            <Text>Goal wasn't created</Text>
          )}
        </>
      </View>
    </View>
  );
};

export default GoalPieDiagramLegend;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 15,
    fontFamily: "Quicksand_700Bold",
  },
});
