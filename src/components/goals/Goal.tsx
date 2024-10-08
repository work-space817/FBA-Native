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
  ViewProps,
} from "react-native";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import GoalSVG from "../../helpers/SVG/UI/GoalSVG";
import DateFormater from "../../helpers/functions/dateFormater";
import { format } from "date-fns";
import { GoalSelectActionType } from "../../store/reducers/goalReducers/types";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import { useTheme } from "../../core/themes/useTheme";

interface IGoalView extends ViewProps {}

const theme = useTheme();

const Goal: FC<IGoalView & IGoal> = memo(
  ({ cost, expireDate, title, selectedCategories, id, style }) => {
    const dispatch = useDispatch();

    const now = new Date().getTime();
    const compareDate = DateFormater(expireDate);
    const formattedDate = format(expireDate, "dd.MM.yyyy");

    const selectGoal = useCallback(async () => {
      const { goalsQuerySnapshot } = await getGoalsData();
      const selectedData = goalsQuerySnapshot.docs.find((doc) =>
        id === doc.id ? doc.data() : null
      );
      const currentGoalData = selectedData?.data() as IGoal;
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

    return (
      <TouchableOpacity activeOpacity={1} onPress={selectGoal}>
        <ComponentsLayout style={[styles.layout, style, expiredLayout]}>
          <View style={styles.distance}>
            <Text style={styles.cost}>{cost} UAH</Text>
            <View style={styles.date}>
              <Text style={[styles.dateText, expiredDateText]}>
                {formattedDate}
              </Text>
              <GoalSVG id="Clock" width="12" height="15" />
            </View>
          </View>
          <View style={styles.distance}>
            <SelectCategoriesSVG id={selectedCategories as string} />
            <Text style={styles.title}>{title}</Text>
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
    borderColor: theme.red,
    borderWidth: 1,
    borderStyle: "solid",
  },
  distance: {
    paddingVertical: 6,
    gap: 4,
  },
  title: {
    color: theme.text,
  },
  cost: {
    color: theme.text,
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
    color: theme.subText,
    fontSize: 12,
    fontFamily: "Quicksand_600SemiBold",
  },
  expiredDateText: {
    color: theme.red,
  },
});

export default Goal;
