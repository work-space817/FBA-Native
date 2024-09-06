import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import LogIn from "../../../../components/auth/login/LogIn";

const LoginScreen = memo(() => {
  return (
    <AuthLayout subtitle="Please, enter information about you">
      <LogIn />
    </AuthLayout>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({});
