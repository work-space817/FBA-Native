import { IBalance } from "../../api/firebase/user/userBalance/types";
import { IGoal } from "../../components/goals/types";
import { ITransaction } from "../../components/transactions/types";

export interface IAuthUser {
  isAuth: boolean;
}
export enum AuthUserActionType {
  LOGIN_USER = "AUTH_LOGIN_USER",
  LOGOUT_USER = "AUTH_LOGOUT_USER",
}
export interface IGoalList {
  goalList: IGoal[];
  isUpdatedGoaliList: boolean;
}
export enum GoalListActionType {
  GOAL_LIST = "GOAL_LIST",
  UPDATE_GOALS_LIST = "UPDATE_GOALS_LIST",
}
export interface IGoalSelect {
  selectedGoal: IGoal | null;
}
export enum GoalSelectActionType {
  GOAL_SELECT = "GOAL_SELECT",
}
export interface ISelectCategories {
  selectedCategories: string | null;
  isSelected: boolean;
}
export enum SelectCategoriesActionType {
  SELECT_CATEGORIES = "SELECT_CATEGORIES",
  UNSELECT_CATEGORIES = "UNSELECT_CATEGORIES",
}
export interface IModalCloser {
  isModalClose: boolean;
}
export enum ModalCloserActionType {
  MODAL_CLOSE = "MODAL_CLOSE",
}
export interface IUserBalance {
  balance: IBalance;
  isUpdatedBalance: boolean;
}
export enum UserBalanceActionType {
  SET_BALANCE = "SET_BALANCE",
  UPDATE_BALANCE = "UPDATE_BALANCE",
}
export interface ITransactionList {
  transactionList: ITransaction[];
  isUpdatedList: boolean;
}
export enum TransactionListActionType {
  TRANSACTION_LIST = "TRANSACTION_LIST",
  UPDATE_TRANSACTION_LIST = "UPDATE_TRANSACTION_LIST",
}

export interface IScrollViewPosition {
  keyboardAwarePosition: number;
}
export enum ScrollViewPositionActionType {
  SET_POSITION = "SET_POSITION",
}

export interface ICalendarDatesRangeReducer {
  datesRange: { startDate: string; endDate?: string };
}
export enum ICalendarDatesRangeActionType {
  SET_DEFAULT_DATES_RANGE = "SET_DEFAULT_DATES_RANGE",
  SET_DATES_RANGE = "SET_DATES_RANGE",
}
// export interface IMonthAndYearRange {
//   selectedMonthAndYear: { month: number; year: number };
// }
// export enum MonthAndYearRangeActionType {
//   SET_MONTH_AND_YEAR = "SET_MONTH_AND_YEAR",
// }
