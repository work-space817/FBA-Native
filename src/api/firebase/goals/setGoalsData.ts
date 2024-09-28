import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IGoalAdd } from "../../../components/goals/types";

const setGoalsData = async (values: any) => {
  const userId = await AsyncStorage.getItem("uid");
  const userGoalsRef = doc(collection(firestore, "goals"), `${userId}`);
  const goalsData = await addDoc(collection(userGoalsRef, "goal"), {
    ...values,
  });

  return goalsData;
};

export default setGoalsData;
