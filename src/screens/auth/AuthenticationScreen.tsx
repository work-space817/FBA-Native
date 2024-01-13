import { Text, TouchableOpacity, View, Button, StyleSheet } from "react-native";
import AuthLayout from "../layouts/auth/AuthLayout";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/UI/CustomButton";
import { useState } from "react";
import SignUp from "../../components/auth/registration/SignUp";
import LogIn from "../../components/auth/login/LogIn";
import { StackNavigation } from "../../navigation/Navigation";

export default function AuthenticationScreen() {
  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const { navigate } = useNavigation<StackNavigation>();

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
