export interface ITransactionAdd {
  transactionTitle: string;
  transactionValue: number;
  transactionTime: string;
  transactionDate: string;
}

export interface ITransaction {
  transactionTitle: string;
  transactionValue: number;
  transactionTime: string;
  transactionDate: string;
  transactionType: string;
  selectedCategories: string;
  id: string;
}
