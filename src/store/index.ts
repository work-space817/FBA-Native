import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/userReducers/AuthReducer";
import { UserBalanceReducer } from "./reducers/userReducers/UserBalanceReducer";
import { GoalListReducer } from "./reducers/goalReducer/GoalListReducer";
import { SelectCategoriesReducer } from "./reducers/common/SelectCategoriesReducer";
import { ModalCloserReducer } from "./reducers/common/ModalCloserReducer";
export const rootReducer = combineReducers({
  auth: AuthReducer,
  selectCategories: SelectCategoriesReducer,
  modalClose: ModalCloserReducer,
  //   selectGoal: SelectGoalReducer,
  goalList: GoalListReducer,
  //   transactionList: TransactionListReducer,
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
