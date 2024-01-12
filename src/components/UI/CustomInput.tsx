import React, { FC } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

interface CustomInputProps {
  label: string;
  inputMode?: "text" | "numeric" | "email";
  keyboardType?: "default" | "number-pad" | "email-address";
  isSecureTextEntry?: boolean;
  field?: string;
  value?: any;
  placeholder?: string;
  onChange: (text: string) => void;
  onFocus?: () => void;
  clientSideError?: string;
  touched?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
  label,
  field,
  inputMode = "text",
  keyboardType = "default",
  isSecureTextEntry,
  value,
  placeholder,
  onChange,
  clientSideError,
  touched,
  onFocus,
  autoComplete = "",
  disabled,
}) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: clientSideError && touched ? "red" : "gray" },
        ]}
        inputMode={inputMode}
        onChangeText={onChange}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        secureTextEntry={isSecureTextEntry}
        keyboardType={keyboardType}
        editable={!disabled}
      />
      {clientSideError && touched && (
        <Text style={styles.errorText}>{clientSideError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default CustomInput;
