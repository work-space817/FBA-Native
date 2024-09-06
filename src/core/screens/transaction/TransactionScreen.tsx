import { useDispatch } from "react-redux";
import GoalEdit from "../../../components/goals/GoalEdit";
import TransactionTable from "../../../components/transactions/TransactionTable";
import { useEffect } from "react";
import { ICalendarDatesRangeActionType } from "../../../store/reducers/calendarReducers/types";
import {
  GoalSelectActionType,
  GoalListActionType,
} from "../../../store/reducers/goalReducers/types";
import { TransactionListActionType } from "../../../store/reducers/transactionReducers/types";

import DefaultLayout from "../../layouts/default/DefaultLayout";
import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";
import GoalSlider from "../../../components/goals/GoalSlider";

export default function TransactionScreen() {
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
      payload: false,
    });
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE,
    });
    dispatch({
      type: ICalendarDatesRangeActionType.SET_CALENDAR_OPEN,
      payload: false,
    });
    console.log("Refreshing components...");
  };

  useEffect(() => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_CALENDAR_OPEN,
      payload: false,
    });
  }, []);

  return (
    <DefaultScrollableLayout
      scrollEnabled={false}
      onRefreshComponents={onRefreshComponents}
    >
      {/* <GoalSlider />
      <GoalEdit /> */}
      <TransactionTable />
    </DefaultScrollableLayout>
  );
}
