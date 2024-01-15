import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import AuthLayout from "../layouts/auth/AuthLayout";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/UI/CustomButton";
import { useEffect, useState } from "react";
import SignUp from "../../components/auth/registration/SignUp";
import LogIn from "../../components/auth/login/LogIn";
import { StackNavigation } from "../../navigation/Navigation";
import { AuthUserActionType, IAuthUser } from "../../store/reducers/types";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import CustomLoading from "../../components/UI/CustomLoading";

export default function AuthenticationScreen() {
  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  const { navigate } = useNavigation<StackNavigation>();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (uid) {
          dispatch({ type: AuthUserActionType.LOGIN_USER });
          navigate("HomeScreen");
        } else {
          dispatch({ type: AuthUserActionType.LOGOUT_USER });
        }
      } catch (error: any) {
        console.error("Помилка перевірки айді користувача:", error);
      }
    };
    console.log("isAuth:", isAuth);
    getUserId();
  }, [isAuth]);

  const showLogIn = (e: React.TouchEvent<Element>) => {
    if (e) {
      setSignUpVisible(false);
      setLogInVisible(true);
    }
  };
  const showSignUp = (e: React.TouchEvent<Element>) => {
    if (e) {
      setLogInVisible(false);
      setSignUpVisible(true);
    }
  };

  const handleOnNavigate = () => navigate("HomeScreen");

  return (
    <AuthLayout>
      <TouchableOpacity onPress={handleOnNavigate}>
        <Text style={styles.authTitle}>Financial Budgeting App</Text>
      </TouchableOpacity>
      {isAuth ? (
        <CustomLoading />
      ) : (
        <View style={styles.buttonsLayout}>
          <CustomButton
            title={"Sign up"}
            onPress={showSignUp}
            theme={signUpVisible ? "primary" : "none"}
          />
          <CustomButton
            title={"Log in"}
            onPress={showLogIn}
            theme={logInVisible ? "primary" : "none"}
          />
        </View>
      )}

      {signUpVisible && <SignUp />}
      {logInVisible && <LogIn />}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  authTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 22,
  },
  buttonsLayout: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
