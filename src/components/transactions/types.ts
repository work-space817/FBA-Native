import { Categories } from "../common/category/types";

export interface ITransactionAdd {
  transactionTitle: string;
  transactionValue: string; //! string
  transactionTime: string;
  transactionDate: string;
  transactionType: string;
  selectedCategories: string;
}

export interface ITransaction {
  transactionTitle: string;
  transactionValue: number; //! number
  transactionTime: string;
  transactionDate: string;
  transactionType: string;
  selectedCategories: string;
  id: string;
}
