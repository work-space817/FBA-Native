import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthReducer } from "./reducers/userReducers/AuthReducer";
import { UserBalanceReducer } from "./reducers/userReducers/UserBalanceReducer";
import { GoalListReducer } from "./reducers/goalReducers/GoalListReducer";
import { SelectCategoriesReducer } from "./reducers/common/SelectCategoriesReducer";
import { ModalCloserReducer } from "./reducers/common/ModalCloserReducer";
import { SelectGoalReducer } from "./reducers/goalReducers/SelectGoalReducer";
import { TransactionListReducer } from "./reducers/transactionReducers/TransactionListReducer";
import { ScrollViewPositionReducer } from "./reducers/common/ScrollViewPositionReducer";
export const rootReducer = combineReducers({
  auth: AuthReducer,
  selectCategories: SelectCategoriesReducer,
  modalClose: ModalCloserReducer,
  selectGoal: SelectGoalReducer,
  goalList: GoalListReducer,
  transactionList: TransactionListReducer,
  scrollViewPosition: ScrollViewPositionReducer,
  //   modalClose: ModalCloserReducer,
  userBalance: UserBalanceReducer,
  //   datesRange: DatesRange,
  //   monthAndYearRange: MonthAndYearRange,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  //   middleware: [thunk],
});

export type RootState = ReturnType<typeof rootReducer>;
