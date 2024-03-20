import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITransaction } from "./types";
import { RootState } from "../../store";
import getTransactionData from "../../api/firebase/transactions/getTransactionData";

const TransactionList = (
  startDate: string,
  endDate?: string,
  requestLimit?: number
) => {
  console.log("startDate: ", startDate);
  const [loading, setLoading] = useState<boolean>(false);
  const [amountTransaction, setAmountTransaction] = useState<number>(0);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const { isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList
  );

  const fetchUserTransactions = async () => {
    try {
      setLoading(true);
      const { transactionsData, totalAmountTransaction } =
        await getTransactionData(startDate, endDate, requestLimit);
      setAmountTransaction(totalAmountTransaction);
      const transactionData = transactionsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITransaction[];
      setTransactionList(transactionData);
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
    return () => {
      fetchUserTransactions();
    };
  }, [isUpdatedList, startDate, endDate, requestLimit !== undefined]);

  return { loading, transactionList, amountTransaction };
};

export default TransactionList;
