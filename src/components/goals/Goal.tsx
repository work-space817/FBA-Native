import { FC, memo, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { IGoal } from "./types";
import getGoalsData from "../../api/firebase/goals/getGoalsData";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import GoalSVG from "../../helpers/SVG/UI/GoalSVG";
import { GoalSelectActionType } from "../../store/reducers/types";
import DateFormater from "../../helpers/functions/dateFormater";
import { format } from "date-fns";

const Goal: FC<IGoal> = memo(
  ({ cost, expireDate, title, selectedCategories, id, style }) => {
    const dispatch = useDispatch();

    const now = new Date().getTime();
    const compareDate = DateFormater(expireDate);
    const formattedDate = format(expireDate, "dd.MM.yyyy");

    const selectGoal = useCallback(async () => {
      const fetchGoals = await getGoalsData();
      const fetchCurrentGoal = fetchGoals.docs.find((doc) =>
        id === doc.id ? doc.data() : null
      );
      const currentGoalData = { ...fetchCurrentGoal?.data(), id };
      console.log("currentGoalData: ", currentGoalData);
      if (id) {
        dispatch({
          type: GoalSelectActionType.GOAL_SELECT,
          payload: currentGoalData,
        });
      }
    }, [id, dispatch]);

    const expiredLayout: StyleProp<ViewStyle> =
      now > compareDate ? styles.expiredLayout : null;
    const expiredDateText: StyleProp<any> =
      now > compareDate ? styles.expiredDateText : null;
    const expiredClock = now > compareDate ? "red" : undefined;

    return (
      <TouchableOpacity activeOpacity={1} onPress={selectGoal}>
        <ComponentsLayout style={[styles.layout, style, expiredLayout]}>
          <View style={styles.distance}>
            <Text style={styles.cost}>{cost} UAH</Text>
            <View style={styles.date}>
              <Text style={[styles.dateText, expiredDateText]}>
                {formattedDate}
              </Text>
              <GoalSVG id="Clock" width="12" height="15" fill={expiredClock} />
            </View>
          </View>
          <View style={styles.distance}>
            <SelectCategoriesSVG id={selectedCategories as string} />
            <Text>{title}</Text>
          </View>
        </ComponentsLayout>
      </TouchableOpacity>
    );
  }
);
const styles = StyleSheet.create({
  layout: {
    width: 105,
    marginHorizontal: 10,
    marginVertical: 15,
    gap: 12,
  },
  expiredLayout: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  distance: {
    paddingVertical: 6,
    gap: 4,
  },
  cost: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  date: {
    gap: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Quicksand_600SemiBold",
    color: "rgba(0,0, 0, 0.50)",
  },
  expiredDateText: {
    color: "rgb(255,0, 0)",
  },
});

export default Goal;
