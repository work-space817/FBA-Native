import DefaultLayout from "../layouts/default/DefaultLayout";
import ComponentsLayout from "../layouts/components/ComponentsLayout";
import DataByCalendarRange from "../../components/common/DataByCalendarRange";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";

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
      <ComponentsLayout
        style={{ height: 500, width: 350, zIndex: 1 }}
      ></ComponentsLayout>
    </DefaultLayout>
  );
}
