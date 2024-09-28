import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { firestore } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITransaction } from "../../../components/transactions/types";

const getTransactionData = async (
  startDate?: string,
  endDate?: string,
  requestLimit?: number
) => {
  const userId = await AsyncStorage.getItem("uid");

  const userTransactionsRef = collection(
    firestore,
    `transactions/${userId}/transaction`
  );
  const transactionsQueryArgs: QueryConstraint[] = [
    orderBy("transactionDate", "desc"),
  ];

  if (startDate && endDate) {
    transactionsQueryArgs.push(where("transactionDate", ">=", startDate));
    transactionsQueryArgs.push(where("transactionDate", "<=", endDate));
  } else if (startDate) {
    transactionsQueryArgs.push(where("transactionDate", "==", startDate));
  }
  if (requestLimit) {
    transactionsQueryArgs.push(limit(requestLimit));
  }
  const transactionsQuery = query(
    userTransactionsRef,
    ...transactionsQueryArgs
  );

  const transactionQuerySnapshot = await getDocs(transactionsQuery);

  const transactionsData = transactionQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ITransaction[];

  return {
    transactionsData,
    transactionQuerySnapshot,
  };
};

export default getTransactionData;
