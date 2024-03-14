import React, { FC, memo, useRef, useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  isSecureTextEntry?: boolean;
  field?: string;
  value?: any;
  onChange?: (text: any) => void;
  clientSideError?: string;
  touched?: boolean;
  disabled?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  layoutStyle?: ViewStyle;
}

const CustomInput: FC<CustomInputProps> = memo(
  ({
    layoutStyle,
    style,
    label,
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
    autoCapitalize,
  }) => {
    return (
      <View style={[styles.layout, layoutStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={[
            styles.input,
            { borderColor: clientSideError && touched ? "red" : "gray" },
            style,
          ]}
          inputMode={inputMode}
          onChangeText={onChange}
          onFocus={onFocus}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isSecureTextEntry}
          keyboardType={keyboardType}
          editable={!disabled}
          autoCapitalize={autoCapitalize}
        />
        {clientSideError && touched && (
          <Text style={styles.errorText}>{clientSideError}</Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  layout: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
  },
  input: {
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
