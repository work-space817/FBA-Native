import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import setUserAuth from "../../../api/firebase/user/userInfo/setUserAuth";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";
import { auth } from "../../../api/firebase/config";
import setAuthToken from "../../../helpers/functions/setAuthToken";
import { ILogIn } from "./types";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../../../store/reducers/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../navigation/Navigation";

const LogIn = () => {
  const init: ILogIn = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigation>();

  const onSubmitHandler = async (values: ILogIn) => {
    try {
      const logInResult = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await setAuthToken(logInResult);
      dispatch({ type: AuthUserActionType.LOGIN_USER });
      navigate("HomeScreen");
      handleReset(values);
    } catch (error: any) {
      console.log(error);
      const code = error.code;
      console.log(code);
      switch (code) {
        case "auth/user-not-found":
          setFieldError("email", "User was not found");
          break;
        case "auth/wrong-password":
          setFieldError("password", "Wrong password");
          break;
        default:
          break;
      }
    }
  };

  const checkUpForm = yup.object({
    email: yup
      .string()
      .required("Field should not be empty")
      .email("Enter corrent email"),
    password: yup
      .string()
      .required("Field should not be empty")
      .min(6, "Password must have at least 6 symbols")
      .matches(/[0-9a-zA-Z]/, "Enter only number & eng characters"),
  });
  const formik = useFormik({
    initialValues: init,
    onSubmit: onSubmitHandler,
    validationSchema: checkUpForm,
  });
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    handleReset,
    setFieldError,
  } = formik;

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <CustomInput
          label="Email"
          field="emailAddress"
          inputMode="email"
          value={values.email}
          keyboardType="email-address"
          onChange={handleChange("email")}
          clientSideError={errors.email}
          touched={touched.email}
          placeholder="exampleMail@mail.com"
          autoCapitalize={"none"}
        />
        <CustomInput
          label="Password"
          field="password"
          value={values.password}
          isSecureTextEntry={true}
          autoComplete="current-password"
          onChange={handleChange("password")}
          clientSideError={errors.password}
          touched={touched.password}
        />
        <CustomButton title={"Log in"} theme="primary" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    paddingTop: 25,
    paddingBottom: 25,
    marginTop: 25,
    alignItems: "center",

    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default LogIn;
