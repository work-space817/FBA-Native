import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import setUserAuth from "../../../api/firebase/user/userInfo/setUserAuth";
import { ISignUp } from "./types";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";

const SignUp = () => {
  const init: ISignUp = {
    email: "",
    password: "",
    currentBalance: "0",
  };
  const onSubmitHandler = async (values: ISignUp) => {
    try {
    } catch (error: any) {
      console.log("error: ", error);
      const code = error.code;
      switch (code) {
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
    setFieldValue,
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
        <CustomInput
          label="Current balance"
          field="currentBalance"
          inputMode="numeric"
          keyboardType="number-pad"
          value={values.currentBalance}
          onChange={handleChange("currentBalance")}
          onFocus={() => setFieldValue("currentBalance", "")}
          clientSideError={errors.currentBalance}
          touched={touched.currentBalance}
        />
        {/* <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity> */}
        <CustomButton title={"Sign up"} theme="primary" onPress={() => {}} />
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
export default SignUp;
