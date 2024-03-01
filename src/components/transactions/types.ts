import { ViewStyle } from "react-native";

export interface ITransactionAdd {
  transactionTitle: string;
  transactionValue: number | string;
  transactionTime: string;
  transactionDate: string;
  transactionType: string;
  selectedCategories: string;
}

export interface ITransaction {
  transactionTitle: string;
  transactionValue: number;
  transactionTime: string;
  transactionDate: string;
  transactionType: string;
  selectedCategories: string | React.ReactNode;
  id: string;
  style?: ViewStyle[];
}
