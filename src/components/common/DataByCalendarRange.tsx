import { StyleSheet, View } from "react-native";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CalendarSVG from "../../helpers/SVG/common/CalendarSVG";
import CustomButton from "../UI/CustomButton";
import { useDispatch } from "react-redux";
import { ICalendarDatesRangeActionType } from "../../store/reducers/types";
import ShowSelectedDates from "../../helpers/functions/UI/ShowSelectedDates";

const DataByCalendarRange = () => {
  const dispatch = useDispatch();
  const { datesRange } = useSelector((store: RootState) => store.datesRange);

  const onOpenCalendar = () => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_CALENDAR_OPEN,
      payload: true,
    });
  };

  return (
    <ComponentsLayout>
      <View style={styles.layout}>
        <ShowSelectedDates
          dates={{
            startDate: datesRange.startDate,
            endDate: datesRange.endDate,
          }}
          style={styles.titleText}
          dateFormat="d MMMM yyyy"
        />
        <CustomButton
          theme="none"
          onPress={onOpenCalendar}
          style={styles.calendarButton}
        >
          <CalendarSVG id="Calendar" width={16} height={16} />
        </CustomButton>
      </View>
      <CalendarWithRange onDismiss={() => {}} maskStyle={styles.maskStyle} />
    </ComponentsLayout>
  );
};

export default DataByCalendarRange;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
  calendarButton: {
    borderRadius: 10,
    padding: 10,
  },
  maskStyle: {
    width: "100%",
    alignItems: "center",
  },
});
