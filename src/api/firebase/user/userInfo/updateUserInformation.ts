import getUserId from "../../../../helpers/functions/getUserId";
import {
  DocumentReference,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "../../config";
import { User, updatePassword } from "firebase/auth";

const updateUserInformation = async (values: any) => {
  console.log("values: ", values);
  const userId = await getUserId();
  const userRef = collection(firestore, "users");
  const querySnapshot = await getDocs(userRef);
  const userInfo = querySnapshot.docs.find((user) =>
    user.id == userId ? user : null
  );
  const userData = userInfo?.ref as DocumentReference;
  const updateUserPassword = await updatePassword(
    auth.currentUser as User,
    values.newPassword
  );
  console.log("updateUserPassword: ", updateUserPassword);
  const updateProfle = await updateDoc(userData, {
    password: values.newPassword,
    photo: values.photo,
  });
};

export default updateUserInformation;
