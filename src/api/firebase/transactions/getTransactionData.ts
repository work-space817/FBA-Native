import { collection, doc, getDocs, limit, query } from "firebase/firestore";
import { firestore } from "../config";
import getUserId from "../../../helpers/functions/getUserId";

const getTransactionData = async (requestLimit: number) => {
  const userId = await getUserId();

  const userTransactionsRef = doc(
    collection(firestore, "transactions"),
    `${userId}`
  );
  const transactionsQuery = query(
    collection(userTransactionsRef, "transaction"),
    limit(requestLimit)
  );
  const transactionsData = await getDocs(transactionsQuery);
  return transactionsData;
};

export default getTransactionData;
