import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";
import { useLoginController } from "./useLoginController";

const LoginView = memo(() => {
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    toRegister,
    loading,
  } = useLoginController();

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
        <TouchableOpacity onPress={toRegister}>
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
export default LoginView;
