import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { useFormik } from "formik";
import { auth } from "../../../api/firebase/config";
import setAuthToken from "../../../helpers/functions/setAuthToken";
import { ILogIn } from "./types";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { StackNavigation } from "../../../core/navigation/Navigation";
import { ScreenNames } from "../../../core/navigation/routes";

export const useLoginController = () => {
  const init: ILogIn = {
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigation>();

  const toRegister = () => {
    navigate(ScreenNames.RegisterScreen);
  };

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

  return {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    toRegister,
    loading,
  };
};
