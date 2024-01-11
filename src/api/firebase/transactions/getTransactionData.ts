import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../config";
import getUserId from "../../../helpers/functions/getUserId";

const getTransactionData = async () => {
  const userId = getUserId();

  const userTransactionsRef = doc(
    collection(firestore, "transactions"),
    `${userId}`
  );
  const transactionsData = await getDocs(
    collection(userTransactionsRef, "transaction")
  );
  return transactionsData;
};

export default getTransactionData;
