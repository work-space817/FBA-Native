import { IUserBalance, UserBalanceActionType } from "../types";

const initState: IUserBalance = {
  isUpdatedBalance: false,
  balance: {
    currentBalance: 0,
    incomingBalance: 0,
    outcomingBalance: 0,
  },
};
export const UserBalanceReducer = (
  state = initState,
  action: any
): IUserBalance => {
  switch (action.type) {
    case "SET_BALANCE": {
      return {
        ...state,
        isUpdatedBalance: false,
        balance: action.payload,
      };
    }
    case "UPDATE_BALANCE":
      return {
        ...state,
        isUpdatedBalance: true,
      };
    default:
      return state;
  }
};
