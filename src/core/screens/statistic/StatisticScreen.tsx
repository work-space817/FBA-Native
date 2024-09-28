import DataByCalendarRange from "../../../components/common/UI/DataByCalendarRange";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import CustomCalendarHeader from "../../../lib/react-native-calendars/CustomCalendarHeader";
import { ICalendarDatesRangeActionType } from "../../../store/reducers/calendarReducers/types";
import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";

export default function StatisticScreen() {
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
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <DataByCalendarRange />
      <CustomCalendarHeader />
    </DefaultScrollableLayout>
  );
}
