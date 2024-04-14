import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import getUserInformation from "../../api/firebase/user/userInfo/getUserInformation";
import { format } from "date-fns/format";
import TransactionList from "../transactions/TransactionList";
import { UserBalanceActionType } from "../../store/reducers/userReducers/types";

const UserBalance = () => {
  const dispatch = useDispatch();
  const [balance, setBalance] = useState<any>({
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
  const { transactionList } = TransactionList(
    defaultStartedDate,
    defaultEndedDate
  );

  const fetchUserBalances = async () => {
    try {
      const { currentBalance } = await getUserInformation();
      const { incomeBalance, outcomeBalance } = transactionList.reduce(
        (acc, transaction) => {
          if (transaction.transactionType === "Income transaction") {
            acc.incomeBalance += transaction.transactionValue;
          } else if (transaction.transactionType === "Outcome transaction") {
            acc.outcomeBalance += transaction.transactionValue;
          }
          return acc;
        },
        { incomeBalance: 0, outcomeBalance: 0 }
      );

      setBalance({
        currentBalance: currentBalance,
        incomeBalance: incomeBalance,
        outcomeBalance: outcomeBalance,
      });

      dispatch({
        type: UserBalanceActionType.SET_BALANCE,
        payload: currentBalance,
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
  }, [isUpdatedBalance, transactionList]);

  console.log("balance: ", balance);
  return { balance };
};

export default UserBalance;
