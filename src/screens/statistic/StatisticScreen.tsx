import DefaultLayout from "../layouts/default/DefaultLayout";
import DataByCalendarRange from "../../components/common/DataByCalendarRange";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import CustomCalendarHeader from "../../lib/react-native-calendars/CustomCalendarHeader";
import { ICalendarDatesRangeActionType } from "../../store/reducers/calendarReducers/types";

export default function StatisticScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const onRefreshComponents = () => {
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
    <DefaultLayout
      navigation={navigation}
      onRefreshComponents={onRefreshComponents}
    >
      <DataByCalendarRange />
      <CustomCalendarHeader />
    </DefaultLayout>
  );
}
