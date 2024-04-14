import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITransaction } from "./types";
import { RootState } from "../../store";
import getTransactionData from "../../api/firebase/transactions/getTransactionData";
import { TransactionListActionType } from "../../store/reducers/transactionReducers/types";

const TransactionList = (
  startDate?: string,
  endDate?: string,
  requestLimit?: number
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const [amountTransaction, setAmountTransaction] = useState<number>(0);
  const { isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList
  );
  const dispatch = useDispatch();

  const fetchUserTransactions = async () => {
    try {
      console.log("efirst");
      setLoading(true);
      const { transactionsData, totalAmountTransaction } =
        await getTransactionData(startDate, endDate, requestLimit);
      const transactionData = transactionsData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ITransaction[];
      setTransactionList(transactionData);
      setAmountTransaction(totalAmountTransaction);
      setLoading(false);
      dispatch({
        type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
        payload: true,
      });
    } catch (error) {
      console.error(
        "Сталася помилка при отриманні транзакцій користувача:",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [isUpdatedList, startDate, endDate, requestLimit]);

  return { loading, transactionList, amountTransaction };
};

export default TransactionList;
