import {
  DocumentReference,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../config";
import { User, updatePassword } from "firebase/auth";
import { IUpdateUserInformation } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateUserInformation = async (values: IUpdateUserInformation) => {
  console.log("values: ", values);
  const userId = await AsyncStorage.getItem("uid");
  const userRef = collection(firestore, "users");
  const querySnapshot = await getDocs(userRef);
  const userInfo = querySnapshot.docs.find((user) =>
    user.id == userId ? user : null
  );
  const userData = userInfo?.ref as DocumentReference;

  if (values.password) {
    const updateUserPassword = await updatePassword(
      auth.currentUser as User,
      values.password
    );
    console.log("updateUserPassword: ", updateUserPassword);
  }
  const updateUserInfo = await updateDoc(userData, {
    currentBalance: values.currentBalance,
  });
  console.log("updateUserInfo: ", updateUserInfo);
};

export default updateUserInformation;
