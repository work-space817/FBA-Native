import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/UI/CustomButton";
import { memo, useEffect, useState } from "react";
import SignUp from "../../../components/auth/registration/RegistrationView";
import LogIn from "../../../components/auth/login/LoginView";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import CustomLoading from "../../../components/UI/CustomLoadingAnimation";
import { RootState } from "../../../store";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { TabNames } from "../../navigation/routes";
import { TabsNavigation } from "../../navigation/TabNavigation";

const AuthenticationScreen = memo(() => {
  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: RootState) => store.auth);
  const { navigate } = useNavigation<TabsNavigation>();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (uid) {
          dispatch({ type: AuthUserActionType.LOGIN_USER });
          navigate(TabNames.TabName, TabNames.Tabs.HomeScreen);
        } else {
          dispatch({ type: AuthUserActionType.LOGOUT_USER });
        }
      } catch (error: any) {
        console.error("User auth error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    getUserId();
  }, [isAuth]);

  const showLogIn = (e: GestureResponderEvent) => {
    if (e) {
      setSignUpVisible(false);
      setLogInVisible(true);
    }
  };
  const showSignUp = (e: GestureResponderEvent) => {
    if (e) {
      setLogInVisible(false);
      setSignUpVisible(true);
    }
  };

  const handleOnNavigate = () =>
    navigate(TabNames.TabName, TabNames.Tabs.HomeScreen);

  return (
    <AuthLayout>
      <TouchableOpacity onPress={handleOnNavigate}>
        <Text style={styles.authTitle}>Financial Budgeting App</Text>
      </TouchableOpacity>
      {isAuth || isLoading ? (
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
});
export default AuthenticationScreen;

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
