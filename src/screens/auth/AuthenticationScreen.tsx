import { Text, TouchableOpacity, View, Button, StyleSheet } from "react-native";
import AuthLayout from "../layouts/auth/AuthLayout";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/UI/CustomButton";
import HeaderSVG from "../../helpers/SVG/layoutComponents/HeaderSVG";
import { useState } from "react";

export default function AuthenticationScreen() {
  const navigate = useNavigation();

  const [logInVisible, setLogInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);

  let changeButtonProps = {
    color: "rgba(220,220,220,0.6)",
    textColor: "rgb(0,0,0)",
  };
  const showLogIn = (e: React.TouchEvent<Element>) => {
    if (e) {
      setLogInVisible(true);
      setSignUpVisible(false);
    }
  };
  const showSignUp = (e: React.TouchEvent<Element>) => {
    if (e) {
      setSignUpVisible(true);
      setLogInVisible(false);
    }
  };
  return (
    <AuthLayout>
      <TouchableOpacity onPress={navigate.goBack}>
        {/* <View style={styles.innerLayout}> */}
        <Text style={styles.authTitle}>Financial Budgeting App</Text>
        {/* </View> */}
      </TouchableOpacity>
      <View style={styles.buttonsLayout}>
        <CustomButton
          title={"Sign up"}
          activeVoid={showSignUp}
          color={changeButtonProps.color}
          textColor="rgb(0,0,0)"
        />
        <CustomButton
          title={"Log in"}
          activeVoid={showLogIn}
          color="rgba(220,220,220,0.6)"
          textColor="rgb(0,0,0)"
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  // innerLayout: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 10,
  //   flexDirection: "row",
  // },
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
