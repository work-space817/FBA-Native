import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import getUserBalance from "../../api/firebase/user/userBalance/getUserBalance";
import {
  IUserBalance,
  UserBalanceActionType,
} from "../../store/reducers/types";
import { RootState } from "../../store";

const UserBalance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isUpdatedBalance } = useSelector(
    (store: RootState) => store.userBalance as IUserBalance
  );
  const fetchUserBalances = async () => {
    try {
      setLoading(true);
      const fetchUserBalance = await getUserBalance();
      console.log("fetchUserBalance", fetchUserBalance);
      dispatch({
        type: UserBalanceActionType.SET_BALANCE,
        payload: fetchUserBalance,
      });
      setLoading(false);
    } catch (error) {
      console.error(
        "Сталася помилка при отриманні балансу користувача:",
        error
      );
    } finally {
      dispatch({
        type: UserBalanceActionType.UPDATE_BALANCE,
        payload: false,
      });
    }
  };
  useEffect(() => {
    fetchUserBalances();
  }, [isUpdatedBalance]);
  return loading;
};

export default UserBalance;
