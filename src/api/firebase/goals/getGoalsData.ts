import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { firestore } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGoal } from "../../../components/goals/types";

const getGoalsData = async () => {
  const userId = await AsyncStorage.getItem("uid");

  const userGoalsRef = collection(firestore, `goals/${userId}/goal`);

  const goalsQueryArgs: QueryConstraint[] = [orderBy("expireDate", "desc")];
  const goalQuery = query(userGoalsRef, ...goalsQueryArgs);
  const goalsQuerySnapshot = await getDocs(goalQuery);

  const goalsData = goalsQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as IGoal[];

  return { goalsData, goalsQuerySnapshot };
};

export default getGoalsData;
