import { addDoc, collection, doc } from "firebase/firestore";
import getUserId from "../../../helpers/functions/getUserId";
import { firestore } from "../config";

const setGoalsData = async (values: any) => {
  const userId = getUserId();
  const userGoalsRef = doc(collection(firestore, "goals"), `${userId}`);
  const goalsData = await addDoc(collection(userGoalsRef, "goal"), {
    ...values,
  });

  return goalsData;
};

export default setGoalsData;
