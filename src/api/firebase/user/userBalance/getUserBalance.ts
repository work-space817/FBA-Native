import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config";
import getUserId from "../../../../helpers/functions/getUserId";
import { IBalance } from "./types";

const getUserBalance = async () => {
  const userId = getUserId();
  const userBalanceRef = doc(collection(firestore, "userBalance"), `${userId}`);
  const querySnapshot = await getDoc(userBalanceRef);
  const balanceData = querySnapshot.data() as IBalance;

  return balanceData;
};

export default getUserBalance;
