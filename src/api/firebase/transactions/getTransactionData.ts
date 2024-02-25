import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { firestore } from "../config";
import getUserId from "../../../helpers/functions/getUserId";

const getTransactionData = async (requestLimit: number) => {
  const userId = await getUserId();

  const userTransactionsRef = collection(
    firestore,
    `transactions/${userId}/transaction`
  );
  const totalAmountTransaction = (await getDocs(query(userTransactionsRef)))
    .size;
  const transactionsQuery = query(
    userTransactionsRef,
    orderBy("transactionDate", "desc"),
    limit(requestLimit)
  );
  const transactionsData = await getDocs(transactionsQuery);
  return { transactionsData, totalAmountTransaction };
};

export default getTransactionData;
