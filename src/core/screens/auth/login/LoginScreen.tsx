import React, { memo } from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import LoginView from "../../../../components/auth/login/LoginView";

const LoginScreen = memo(() => {
  return (
    <AuthLayout subtitle="Please, enter information about you">
      <LoginView />
    </AuthLayout>
  );
});

export default LoginScreen;
