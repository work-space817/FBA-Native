import { format } from "date-fns";
import {
  ICalendarDatesRangeActionType,
  ICalendarDatesRangeReducer,
} from "../types";

const today = new Date();
const defaultStartedDate = format(0, "yyyy-MM-dd");
const defaultEndedDate = format(today, "yyyy-MM-dd");

const initState: ICalendarDatesRangeReducer = {
  datesRange: { startDate: 0, endDate: 0 },
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
      return {
        ...state,
        datesRange: {
          startDate: defaultStartedDate,
          endDate: defaultEndedDate,
        },
      };
    }
    default:
      return state;
  }
};
