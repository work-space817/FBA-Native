import { ITransaction } from "../../../components/transactions/types";

export interface ITransactionList {
  transactionList: ITransaction[];
  isUpdatedList: boolean;
}
export enum TransactionListActionType {
  TRANSACTION_LIST = "TRANSACTION_LIST",
  UPDATE_TRANSACTION_LIST = "UPDATE_TRANSACTION_LIST",
}
