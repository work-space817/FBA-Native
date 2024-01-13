import { UserCredential, getIdToken } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../api/firebase/config";

const setAuthToken = async (authResult: UserCredential) => {
  const user = authResult.user;
  const userToken = (await getIdToken(user)) as string;
  const uid = auth.currentUser?.uid as string;
  console.log("auth.currentUser: ", auth.currentUser?.email);

  try {
    if (userToken && uid) {
      await AsyncStorage.setItem("token", userToken);
      await AsyncStorage.setItem("uid", uid);
    } else {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("uid");
    }
  } catch (error) {
    console.error("AsyncStorage Error: ", error);
  }
  return { userToken, uid };
};

export default setAuthToken;
