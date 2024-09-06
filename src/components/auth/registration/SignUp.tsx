import React, { memo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import setUserAuth from "../../../api/firebase/user/userInfo/setUserAuth";
import { ISignUp } from "./types";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../api/firebase/config";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { StackNavigation } from "../../../core/navigation/Navigation";
import { ScreenNames } from "../../../core/navigation/routes";

const SignUp = memo(() => {
  const init: ISignUp = {
    email: "",
    password: "",
    currentBalance: "0",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const onSubmitHandler = async (values: ISignUp) => {
    setLoading(true);
    console.log("values: ", values);
    try {
      const SignUpResult = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await setUserAuth(values, SignUpResult);
      dispatch({ type: AuthUserActionType.LOGIN_USER });
      navigate(ScreenNames.HomeScreen);
      handleReset(values);
      setLoading(false);
    } catch (error: any) {
      console.log("error: ", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setFieldError("email", "Account is already exist");
          break;
        case "auth/invalid-email":
          setFieldError("email", "Bad email adress");
          break;
        case "auth/weak-password":
          setFieldError("password", "Weak password");
          break;
        case "auth/missing-email":
          setFieldError("email", "Email have not to enter");
          break;
        case "auth/user-disabled":
          setFieldError("email", "Account was deleted");
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
    currentBalance: yup
      .number()
      .positive("Value can not be less than 0")
      .typeError("Please enter numbers")
      .required("Field should not be empty"),
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
    setFieldValue,
    setFieldError,
  } = formik;

  return (
    <View style={styles.layout}>
      <View style={styles.formLayout}>
        <CustomInput
          label="Email"
          field="email"
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
        <CustomInput
          label="Current balance"
          field="currentBalance"
          inputMode="numeric"
          keyboardType="number-pad"
          value={values.currentBalance}
          onChangeText={handleChange("currentBalance")}
          onFocus={() => setFieldValue("currentBalance", "")}
          clientSideError={errors.currentBalance}
          touched={touched.currentBalance}
        />
        <CustomButton
          title={"Sign up"}
          theme={loading ? "secondary" : "primary"}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View style={styles.optionalText}>
        <Text>Do you have an account?</Text>
        <TouchableOpacity onPress={() => navigate(ScreenNames.LoginScreen)}>
          <Text style={styles.toLogin}>Login</Text>
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
    gap: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionalText: {
    gap: 4,
    height: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  toLogin: {
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
export default SignUp;
