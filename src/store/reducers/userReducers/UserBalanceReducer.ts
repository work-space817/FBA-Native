import { IUserBalance, UserBalanceActionType } from "./types";

const initState: IUserBalance = {
  isUpdatedBalance: false,
  userBalance: 0,
};
export const UserBalanceReducer = (
  state = initState,
  action: any
): IUserBalance => {
  switch (action.type) {
    case UserBalanceActionType.SET_BALANCE: {
      return {
        ...state,
        isUpdatedBalance: false,
        userBalance: action.payload,
      };
    }
    case UserBalanceActionType.UPDATE_BALANCE:
      return {
        ...state,
        isUpdatedBalance: true,
      };
    default:
      return state;
  }
};
