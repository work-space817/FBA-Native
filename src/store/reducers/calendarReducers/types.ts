export interface ICalendarDatesRangeReducer {
  datesRange: { startDate: string; endDate?: string };
  isCalendarOpen: boolean;
}
export enum ICalendarDatesRangeActionType {
  SET_DEFAULT_DATES_RANGE = "SET_DEFAULT_DATES_RANGE",
  SET_DATES_RANGE = "SET_DATES_RANGE",
  SET_CALENDAR_OPEN = "SET_CALENDAR_OPEN",
  SET_BALANCE_RANGE = "SET_BALANCE_RANGE",
}
