import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../config";
import { ISignUp } from "../../../../components/auth/registration/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserInformation = async () => {
  const userId = await AsyncStorage.getItem("uid");
  const userRef = collection(firestore, "users");
  const userQuerySnapshot = await getDocs(userRef);
  const userInfo = userQuerySnapshot.docs.find((user) =>
    user.id == userId ? user : null
  );
  const userData = userInfo?.data() as ISignUp;

  return { userData, userQuerySnapshot };
};
export default getUserInformation;
