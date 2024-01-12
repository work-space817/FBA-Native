import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../config";
import getUserId from "../../../../helpers/functions/getUserId";
import { ISignUp } from "../../../../components/auth/registration/types";

const getUserInformation = async () => {
  const userId = getUserId();
  const userRef = collection(firestore, "users");
  const querySnapshot = await getDocs(userRef);
  const userInfo = querySnapshot.docs.find((user) =>
    user.id == userId ? user : null
  );
  const userData = userInfo?.data() as ISignUp;

  return userData;
};
export default getUserInformation;
