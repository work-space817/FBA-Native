import React, { memo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomInput from "../../UI/CustomInput";
import CustomButton from "../../UI/CustomButton";
import { useRegistrationController } from "./useRegistrationController";

const RegistrationView = memo(() => {
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    loading,
    toLogin,
  } = useRegistrationController();

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
        <TouchableOpacity onPress={toLogin}>
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
export default RegistrationView;
