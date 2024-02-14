import { StyleSheet, Text, View } from "react-native";
import GoalPieDiagramList from "./GoalPieDiagramList";
import { PieChart } from "react-native-gifted-charts";
import PieDiagramLabels from "./PieDiagramLabels";
import GoalPieDiagramLegend from "./GoalPieDiagramLegend";
import CustomLoadingAnimation from "../../../UI/CustomLoadingAnimation";

const PieDiagram = () => {
  const {
    fetchGoalsData,
    outterData,
    innerData,
    activeGroup,
    expireGroup,
    activeGroupByCategory,
    expireGroupByCategory,
  } = GoalPieDiagramList();

  const innerCOLORS = [
    "#0088FE",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FC9EA3",
    "#9400D3",
    "#4B0082",
    "#0000FF ",
  ];
  const outterPieData = outterData.map((goal) => {
    const outterCOLORS = goal.isExpire
      ? "rgb(255, 14, 66)"
      : "rgb(54, 222, 34)";
    return {
      value: goal.summaryCount,
      color: outterCOLORS,
    };
  });
  const totalItems = innerData.reduce(
    (result, current) => result + current.summaryGoalCount,
    0
  );
  const innerPieData = innerData.map((goal, index) => {
    const percent = ((goal.summaryGoalCount / totalItems) * 100).toFixed(2);
    const text = +percent > 10 ? percent + "%" : "";
    return {
      ...goal,
      value: goal.summaryGoalCount,
      text: text,
      shiftTextX: -12,
      color: innerCOLORS[index],
    };
  });

  return (
    <>
      {!fetchGoalsData ? (
        <>
          <PieDiagramLabels
            labelState={"active"}
            goalGroup={activeGroup}
            totalItems={totalItems}
          />
          <PieDiagramLabels
            labelState={"expired"}
            goalGroup={expireGroup}
            totalItems={totalItems}
          />
          <View style={styles.outterPieLayout}>
            <PieChart
              data={outterPieData}
              donut
              showGradient
              focusOnPress
              radius={95}
              strokeWidth={5}
              strokeColor="white"
              innerRadius={70}
              centerLabelComponent={() => {
                return (
                  <View style={styles.innerPieLayout}>
                    <PieChart
                      data={innerPieData}
                      onPress={() => {}}
                      focusOnPress
                      radius={63}
                      showText
                      textColor="black"
                      textSize={8}
                      strokeWidth={5}
                      strokeColor="white"
                    />
                  </View>
                );
              }}
            />
          </View>

          <GoalPieDiagramLegend
            activeGroupByCategory={activeGroupByCategory}
            expireGroupByCategory={expireGroupByCategory}
          />
        </>
      ) : (
        <View style={{ justifyContent: "center", height: 300, width: 300 }}>
          <CustomLoadingAnimation />
        </View>
      )}
    </>
  );
};

export default PieDiagram;

const styles = StyleSheet.create({
  outterPieLayout: {
    alignItems: "center",
    paddingVertical: 30,
  },
  innerPieLayout: {
    justifyContent: "center",
    alignItems: "center",
  },
});
