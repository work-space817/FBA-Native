import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "../config";
import getUserId from "../../../helpers/functions/getUserId";

const getTransactionData = async (
  startDate: string,
  endDate?: string,
  requestLimit?: number
) => {
  const userId = await getUserId();

  const userTransactionsRef = collection(
    firestore,
    `transactions/${userId}/transaction`
  );
  const transactionsQueryArgs = [orderBy("transactionDate", "desc")] as any[];

  if (requestLimit) {
    transactionsQueryArgs.push(limit(requestLimit));
  }
  if (startDate && endDate) {
    transactionsQueryArgs.push(where("transactionDate", ">=", startDate));
    transactionsQueryArgs.push(where("transactionDate", "<=", endDate));
  } else if (startDate) {
    transactionsQueryArgs.push(where("transactionDate", "==", startDate));
  }

  const transactionsQuery = query(
    userTransactionsRef,
    ...transactionsQueryArgs
  );

  const transactionsData = await getDocs(transactionsQuery);
  const totalAmountTransaction = (await getDocs(userTransactionsRef)).size;

  return {
    transactionsData,
    totalAmountTransaction,
  };
};

export default getTransactionData;
