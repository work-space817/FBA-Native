import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import setUserAuth from "../../../api/firebase/user/userInfo/setUserAuth";
import { ISignUp } from "./types";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../api/firebase/config";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { StackNavigation } from "../../../core/navigation/Navigation";
import { ScreenNames } from "../../../core/navigation/routes";

export const useRegistrationController = () => {
  const init: ISignUp = {
    email: "",
    password: "",
    currentBalance: "0",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  const toLogin = () => {
    navigate(ScreenNames.LoginScreen);
  };

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
    setFieldValue,
    handleReset,
    setFieldError,
  } = formik;
  return {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    loading,
    toLogin,
  };
};
