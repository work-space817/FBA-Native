import { IBalance } from "./types";
import { collection, doc, setDoc } from "firebase/firestore";
import getUserId from "../../../../helpers/functions/getUserId";
import { firestore } from "../../config";

const setUserBalance = async (values: IBalance) => {
  const userId = getUserId();

  const userBalanceRef = doc(collection(firestore, "userBalance"), `${userId}`);
  const balanceData = setDoc(userBalanceRef, values);
  console.log("db values", values);
  return balanceData;
};

export default setUserBalance;
