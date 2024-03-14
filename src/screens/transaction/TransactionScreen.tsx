import DefaultLayout from "../layouts/default/DefaultLayout";
import GoalSlider from "../../components/goals/GoalSlider";
import { useDispatch } from "react-redux";
import {
  GoalListActionType,
  GoalSelectActionType,
  ICalendarDatesRangeActionType,
  TransactionListActionType,
} from "../../store/reducers/types";
import GoalEdit from "../../components/goals/GoalEdit";
import TransactionTable from "../../components/transactions/TransactionTable";
import { useEffect } from "react";

export default function TransactionScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const onRefreshComponents = () => {
    dispatch({
      type: GoalSelectActionType.GOAL_SELECT,
      selectedGoal: null,
    });
    dispatch({
      type: GoalListActionType.UPDATE_GOALS_LIST,
    });
    dispatch({
      type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
    });
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE,
    });
    console.log("Refreshing components...");
  };
  useEffect(() => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE,
    });
  }, []);

  return (
    <DefaultLayout
      navigation={navigation}
      onRefreshComponents={onRefreshComponents}
      innerStyle={{ paddingBottom: 0 }}
    >
      <GoalSlider />
      <GoalEdit />
      <TransactionTable />
    </DefaultLayout>
  );
}
