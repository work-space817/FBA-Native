import DefaultLayout from "../layouts/default/DefaultLayout";
import GoalSlider from "../../components/goals/GoalSlider";
import { useDispatch } from "react-redux";
import {
  GoalListActionType,
  GoalSelectActionType,
  TransactionListActionType,
} from "../../store/reducers/types";
import GoalEdit from "../../components/goals/GoalEdit";
import TransactionTable from "../../components/transactions/TransactionTable";

export default function TransactionScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const onRefreshComponents = () => {
    dispatch({
      type: GoalListActionType.UPDATE_GOALS_LIST,
    });
    dispatch({
      type: GoalSelectActionType.GOAL_SELECT,
      selectedGoal: null,
    });
    dispatch({
      type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
    });
    console.log("Refreshing components...");
  };

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
