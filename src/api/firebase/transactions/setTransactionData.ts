import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITransactionAdd } from "../../../components/transactions/types";

const setTransactionData = async (values: any) => {
  const userId = await AsyncStorage.getItem("uid");
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
