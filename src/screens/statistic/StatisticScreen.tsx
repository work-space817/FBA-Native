import DefaultLayout from "../layouts/default/DefaultLayout";
import ComponentsLayout from "../layouts/components/ComponentsLayout";
import DataByCalendarRange from "../../components/common/DataByCalendarRange";
import { useDispatch } from "react-redux";
import {
  GoalSelectActionType,
  GoalListActionType,
  TransactionListActionType,
} from "../../store/reducers/types";

export default function StatisticScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const onRefreshComponents = () => {
    console.log("Refreshing components...");
  };
  return (
    <DefaultLayout
      navigation={navigation}
      onRefreshComponents={onRefreshComponents}
    >
      <DataByCalendarRange />
      <ComponentsLayout style={{ height: 300, width: 300 }} />
    </DefaultLayout>
  );
}
