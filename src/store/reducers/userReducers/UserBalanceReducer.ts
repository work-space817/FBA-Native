import { IUserBalance, UserBalanceActionType } from "../types";

const initState: IUserBalance = {
  balance: {
    currentBalance: 0,
    incomingBalance: 0,
    outcomingBalance: 0,
  },
  isUpdatedBalance: false,
};
export const UserBalanceReducer = (
  state = initState,
  action: any
): IUserBalance => {
  switch (action.type) {
    case UserBalanceActionType.SET_BALANCE: {
      return {
        ...state,
        balance: action.payload,
      };
    }
    case UserBalanceActionType.UPDATE_BALANCE:
      return {
        ...state,
        isUpdatedBalance: action.payload,
      };
    default:
      return state;
  }
};
