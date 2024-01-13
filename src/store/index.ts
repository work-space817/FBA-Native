import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/userReducers/AuthReducer";
export const rootReducer = combineReducers({
  auth: AuthReducer,
  //   selectCategories: SelectCategoriesReducer,
  //   selectGoal: SelectGoalReducer,
  //   goalList: GoalListReducer,
  //   transactionList: TransactionListReducer,
  //   modalClose: ModalCloserReducer,
  //   userBalance: UserBalanceReducer,
  //   datesRange: DatesRange,
  //   monthAndYearRange: MonthAndYearRange,
});
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  //   middleware: [thunk],
});