import { addDoc, collection, doc } from "firebase/firestore";
import getUserId from "../../../helpers/functions/getUserId";
import { firestore } from "../config";

const setTransactionData = async (values: any) => {
  const userId = getUserId();
  const userTransactionsRef = doc(
    collection(firestore, "transactions"),
    `${userId}`
  );
  const transactionsData = await addDoc(
    collection(userTransactionsRef, "transaction"),
    {
      ...values,
    }
  );

  return transactionsData;
};

export default setTransactionData;
