import { FC, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { IGoal } from "./types";
import getGoalsData from "../../api/firebase/goals/getGoalsData";
import { View, Text, StyleSheet } from "react-native";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import GoalSVG from "../../helpers/SVG/UI/GoalSVG";

const Goal: FC<IGoal> = memo(
  ({ cost, expireDate, title, index, selectedCategories, id }) => {
    const dispatch = useDispatch();
    // const location = useLocation();
    // const navigate = useNavigate();
    const now = new Date().getTime();
    // const formattedExpireDate = DateFormater(expireDate);

    const selectGoal = useCallback(async () => {
      const fetchGoals = await getGoalsData();
      const fetchCurrentGoal = fetchGoals.find((doc, docIndex) =>
        docIndex + 1 === index ? doc.data() : null
      );
      const currentGoalData = { ...fetchCurrentGoal?.data(), id };
      console.log("currentGoalData: ", currentGoalData);
      //   if (id) {
      //     dispatch({
      //       type: GoalSelectActionType.GOAL_SELECT,
      //       payload: currentGoalData,
      //     });
      //   }
      //   if (location.pathname !== "/transactions") {
      //     navigate("/transactions");
      //   }
    }, [`navigate`, index, id, dispatch]);

    return (
      <ComponentsLayout width={105} marginHorizontal={10} marginVertical={15}>
        <View style={styles.layout}>
          <View style={styles.distance}>
            <Text style={styles.cost}>{cost} UAH</Text>
            <View style={styles.expireDate}>
              <Text style={styles.expireDateText}>{expireDate}</Text>
              <GoalSVG id="Clock" width="12" height="15" />
            </View>
          </View>
          <View style={styles.distance}>
            <SelectCategoriesSVG id={selectedCategories as string} />
            <Text>{title}</Text>
          </View>
        </View>
      </ComponentsLayout>
    );
  }
);
const styles = StyleSheet.create({
  layout: {
    gap: 12,
  },
  distance: {
    paddingVertical: 6,
    gap: 4,
  },
  cost: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  expireDate: {
    gap: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  expireDateText: {
    fontSize: 12,
    fontFamily: "Quicksand_600SemiBold",
    color: "rgba(0,0, 0, 0.50)",
  },
});

export default Goal;
