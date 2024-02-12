import { useSelector } from "react-redux";
import GoalList from "../../../goals/GoalList";
import DateFormater from "../../../../helpers/functions/dateFormater";
import { IGoalByCategory, IGoalCircleStatisticList } from "../types";
import { RootState } from "../../../../store";

const GoalPieDiagramList = () => {
  const fetchGoalsData = GoalList();
  const { goalList } = useSelector((store: RootState) => store.goalList);
  const now = new Date().getTime();

  const outterData = goalList.reduce(
    (result: IGoalCircleStatisticList[], goal) => {
      const formattedExpireDate = DateFormater(goal.expireDate);
      const category = goal.selectedCategories;

      const isExpireGroup = result.find(
        (group) => group.isExpire === now > formattedExpireDate
      );

      if (isExpireGroup) {
        const existingCategory = isExpireGroup.goalsByCategory.find(
          (goals: any) => goals.summaryGoalCategory === category
        );
        if (existingCategory) {
          existingCategory.goals.push(goal);
          existingCategory.summaryGoalValue += goal.cost;
          existingCategory.summaryGoalCount = existingCategory.goals.length;
        } else {
          const summary = {
            summaryGoalCategory: category,
            summaryGoalValue: goal.cost,
            summaryGoalCount: 1,
            goals: [goal],
          };
          isExpireGroup.goalsByCategory.push(summary);
        }
        isExpireGroup.summaryCount += 1;
      } else {
        const group = {
          isExpire: now > formattedExpireDate,
          summaryCount: 1,
          goalsByCategory: [
            {
              summaryGoalCategory: category,
              summaryGoalValue: goal.cost,
              summaryGoalCount: 1,
              goals: [goal],
            },
          ],
        };
        result.push(group);
      }

      return result;
    },
    []
  );

  const innerData: IGoalByCategory[] = outterData.flatMap(
    (doc) => doc.goalsByCategory
  );

  const activeGroup = outterData.filter((group) => !group.isExpire);
  const expireGroup = outterData.filter((group) => group.isExpire);

  const activeGroupByCategory: IGoalByCategory[] = activeGroup.flatMap(
    (group) => group.goalsByCategory
  );
  const expireGroupByCategory: IGoalByCategory[] = expireGroup.flatMap(
    (group) => group.goalsByCategory
  );

  // console.log("expireGroup: ", expireGroup);
  // console.log("activeGroup: ", activeGroup);
  // console.log("innerData: ", innerData);
  // console.log("outterData: ", outterData);

  return {
    fetchGoalsData,
    outterData,
    innerData,
    activeGroup,
    expireGroup,
    activeGroupByCategory,
    expireGroupByCategory,
  };
};

export default GoalPieDiagramList;
