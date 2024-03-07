import { format } from "date-fns";
import {
  ICalendarDatesRangeActionType,
  ICalendarDatesRangeReducer,
} from "../types";

const today = new Date();
const defaultStartedDate = format(today, "yyyy-MM-01");
const defaultEndedDate = format(today, "yyyy-MM-dd");

const initState: ICalendarDatesRangeReducer = {
  datesRange: { startDate: defaultStartedDate, endDate: defaultEndedDate },
};
export const CalendarDatesRangeReducer = (
  state = initState,
  action: any
): ICalendarDatesRangeReducer => {
  switch (action.type) {
    case ICalendarDatesRangeActionType.SET_DATES_RANGE: {
      return {
        ...state,
        datesRange: action.payload,
      };
    }
    case ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE: {
      return state;
    }
    default:
      return state;
  }
};
