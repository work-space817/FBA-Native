import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITransaction } from "./types";
import { RootState } from "../../store";
import getTransactionData from "../../api/firebase/transactions/getTransactionData";
import {
  ITransactionList,
  TransactionListActionType,
} from "../../store/reducers/types";

const TransactionList = (requestLimit: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const fetchUserTransactions = async () => {
    try {
      setLoading(true);
      const fetchTransactionData = await getTransactionData(requestLimit);
      const transactionData = fetchTransactionData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITransaction[];
      const transactionList = dispatch({
        type: TransactionListActionType.TRANSACTION_LIST,
        payload: transactionData,
      });
      setLoading(false);
    } catch (error) {
      console.error(
        "Сталася помилка при отриманні транзакцій користувача:",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [isUpdatedList, requestLimit]);

  return loading;
};

export default TransactionList;
