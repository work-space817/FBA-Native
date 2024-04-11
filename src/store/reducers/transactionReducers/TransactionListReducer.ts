import { ITransactionList, TransactionListActionType } from "../types";

const initState: ITransactionList = {
  isUpdatedList: false,
  transactionList: [],
};

export const TransactionListReducer = (
  state = initState,
  action: any
): ITransactionList => {
  switch (action.type) {
    case TransactionListActionType.TRANSACTION_LIST:
      return {
        ...state,
        isUpdatedList: false,
        transactionList: action.payload,
      };
    case TransactionListActionType.UPDATE_TRANSACTION_LIST:
      return {
        ...state,
        isUpdatedList: action.payload,
      };
    default:
      return state;
  }
};
