import { StyleSheet, Text, View } from "react-native";
import GoalPieDiagramList from "./GoalPieDiagramList";
import { PieChart } from "react-native-gifted-charts";
import PieDiagramLabels from "./PieDiagramLabels";
import GoalPieDiagramLegend from "./GoalPieDiagramLegend";
import CustomLoadingAnimation from "../../../UI/CustomLoadingAnimation";
import { memo } from "react";
import { useTheme } from "../../../../core/themes/useTheme";

const theme = useTheme();

const PieDiagram = memo(() => {
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
    const outterCOLORS = goal.isExpire ? theme.red : theme.green;
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
          {outterData.length > 0 ? (
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
                  radius={90}
                  strokeWidth={5}
                  innerRadius={70}
                  // backgroundColor={theme.colors.none}
                  // strokeColor={theme.background}
                  centerLabelComponent={() => {
                    return (
                      <View style={styles.innerPieLayout}>
                        <PieChart
                          data={innerPieData}
                          onPress={() => {}}
                          focusOnPress
                          radius={63}
                          showText
                          textColor={theme.colors.black.default}
                          textSize={8}
                          strokeWidth={5}
                          strokeColor={theme.background}
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
            <View style={styles.loadingLayout}>
              <Text style={styles.textDiagram}>
                Please, create at least 1 goal
              </Text>
              <CustomLoadingAnimation />
            </View>
          )}
        </>
      ) : (
        <View style={styles.loadingLayout}>
          <CustomLoadingAnimation />
        </View>
      )}
    </>
  );
});

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
  loadingLayout: {
    justifyContent: "center",
    height: 200,
  },
  textDiagram: {
    color: theme.text,
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
    textAlign: "center",
  },
});
