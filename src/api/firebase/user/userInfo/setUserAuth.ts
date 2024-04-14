import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config";
import { UserCredential } from "firebase/auth";
import { ISignUp } from "../../../../components/auth/registration/types";
import setAuthToken from "../../../../helpers/functions/setAuthToken";

const setUserAuth = async (values: ISignUp, authResult: UserCredential) => {
  const { uid } = await setAuthToken(authResult);
  const additionalUserInformation = doc(firestore, "users", uid);
  const userAuth = await setDoc(additionalUserInformation, {
    ...values,
    currentBalance: +values.currentBalance,
  });
};

export default setUserAuth;
