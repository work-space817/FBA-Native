import { ITransactionList } from "../types";

const initState: ITransactionList = {
  isUpdatedList: false,
  transactionList: [],
};

export const TransactionListReducer = (
  state = initState,
  action: any
): ITransactionList => {
  switch (action.type) {
    case "TRANSACTION_LIST":
      return {
        ...state,
        isUpdatedList: false,
        transactionList: action.payload,
      };
    case "UPDATE_TRANSACTION_LIST":
      return {
        ...state,
        isUpdatedList: true,
      };
    default:
      return state;
  }
};
