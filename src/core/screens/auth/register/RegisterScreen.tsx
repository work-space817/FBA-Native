import { View, Text } from "react-native";
import React, { memo } from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import SignUp from "../../../../components/auth/registration/SignUp";

const RegisterScreen = memo(() => {
  return (
    <AuthLayout subtitle="Please, enter information about you">
      <SignUp />
    </AuthLayout>
  );
});

export default RegisterScreen;
