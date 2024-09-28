import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import getUserInformation from "../../api/firebase/user/userInfo/getUserInformation";
import { format } from "date-fns/format";
import { UserBalanceActionType } from "../../store/reducers/userReducers/types";
import { ITransaction } from "../transactions/types";
import getTransactionData from "../../api/firebase/transactions/getTransactionData";
import { IBalance } from "./types";
import { Categories } from "../common/category/types";

const useBalanceController = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<IBalance>({
    currentBalance: 0,
    incomeBalance: 0,
    outcomeBalance: 0,
  });

  const { isUpdatedBalance } = useSelector(
    (store: RootState) => store.userBalance
  );
  const today = new Date();
  const defaultStartedDate = format(today, "yyyy-MM-01");
  const defaultEndedDate = format(today, "yyyy-MM-31");

  const fetchUserBalances = async () => {
    try {
      const { userData } = await getUserInformation();
      const { transactionsData } = await getTransactionData(
        defaultStartedDate,
        defaultEndedDate
      );
      const { incomeBalance, outcomeBalance } = transactionsData.reduce(
        (acc, transaction: ITransaction) => {
          if (transaction.transactionType === Categories.incomeTransaction) {
            acc.incomeBalance += transaction.transactionValue;
          } else if (
            transaction.transactionType === Categories.incomeTransaction
          ) {
            acc.outcomeBalance += transaction.transactionValue;
          }
          return acc;
        },
        { incomeBalance: 0, outcomeBalance: 0 }
      );

      setBalance({
        currentBalance: Number(userData.currentBalance),
        incomeBalance: incomeBalance,
        outcomeBalance: outcomeBalance,
      });

      dispatch({
        type: UserBalanceActionType.SET_BALANCE,
        payload: Number(userData.currentBalance),
      });
      dispatch({
        type: UserBalanceActionType.UPDATE_BALANCE,
        payload: false,
      });
    } catch (error) {
      console.error(
        "Сталася помилка при отриманні балансу користувача:",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserBalances();
  }, [isUpdatedBalance]);

  return { balance };
};

export default useBalanceController;
