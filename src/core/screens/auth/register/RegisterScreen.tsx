import React, { memo } from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import RegistrationView from "../../../../components/auth/registration/RegistrationView";

const RegisterScreen = memo(() => {
  return (
    <AuthLayout subtitle="Please, enter information about you">
      <RegistrationView />
    </AuthLayout>
  );
});

export default RegisterScreen;
