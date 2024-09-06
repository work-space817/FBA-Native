import React, { memo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";
import { auth } from "../../../api/firebase/config";
import setAuthToken from "../../../helpers/functions/setAuthToken";
import { ILogIn } from "./types";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { StackNavigation } from "../../../core/navigation/Navigation";
import { ScreenNames } from "../../../core/navigation/routes";

const LogIn = memo(() => {
  const init: ILogIn = {
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigation>();

  const onSubmitHandler = async (values: ILogIn) => {
    setLoading(true);
    try {
      const logInResult = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await setAuthToken(logInResult);
      dispatch({ type: AuthUserActionType.LOGIN_USER });
      navigate(ScreenNames.HomeScreen);
      handleReset(values);
      setLoading(false);
    } catch (error: any) {
      console.log("error: ", error);
      switch (error.code) {
        case "auth/user-not-found":
          setFieldError("email", "User was not found");
          break;
        case "auth/wrong-password":
          setFieldError("password", "Wrong password");
          break;
        default:
          break;
      }
      setLoading(false);
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
    <View style={styles.layout}>
      <View style={styles.formLayout}>
        <CustomInput
          label="Email"
          field="emailAddress"
          inputMode="email"
          value={values.email}
          keyboardType="email-address"
          onChangeText={handleChange("email")}
          clientSideError={errors.email}
          touched={touched.email}
          placeholder="exampleMail@mail.com"
          autoCapitalize={"none"}
        />
        <CustomInput
          label="Password"
          field="password"
          value={values.password}
          secureTextEntry={true}
          autoComplete="current-password"
          onChangeText={handleChange("password")}
          clientSideError={errors.password}
          touched={touched.password}
        />
        <CustomButton
          title={"Log in"}
          theme={loading ? "secondary" : "primary"}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View style={styles.optionalText}>
        <Text>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigate(ScreenNames.RegisterScreen)}>
          <Text style={styles.toRegister}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  layout: {
    width: "100%",
    gap: 16,
    alignItems: "center",
  },
  formLayout: {
    width: "100%",
    gap: 5,
  },

  optionalText: {
    gap: 4,
    height: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  toRegister: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#rgba(126,76,215,.75)",
    textDecorationLine: "underline",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 18,
  },
});
export default LogIn;
