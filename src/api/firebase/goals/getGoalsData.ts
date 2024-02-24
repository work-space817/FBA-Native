import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../config";
import getUserId from "../../../helpers/functions/getUserId";

const getGoalsData = async () => {
  const userId = await getUserId();

  const userGoalsRef = collection(firestore, `goals/${userId}/goal`);
  const goalQuery = query(userGoalsRef, orderBy("expireDate", "desc"));
  const goalsData = await getDocs(goalQuery);

  return goalsData;
};

export default getGoalsData;
