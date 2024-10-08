import React, { FC, memo } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../core/themes/useTheme";

interface CustomInputProps extends TextInputProps {
  field?: string;
  label?: string;
  clientSideError?: string;
  touched?: boolean;
  layoutStyle?: ViewStyle;
}

const theme = useTheme();

const CustomInput: FC<CustomInputProps> = ({ ...props }) => {
  const border =
    props.clientSideError && props.touched ? theme.red : theme.border;
  return (
    <View style={[styles.layout, props.layoutStyle]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        placeholderTextColor={theme.text}
        style={[
          styles.input,
          props.style,
          {
            borderColor: border,
          },
        ]}
      />
      {props.clientSideError && props.touched && (
        <Text style={styles.errorText}>{props.clientSideError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingRight: 1,
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: theme.text,
    marginBottom: 5,
  },
  input: {
    color: theme.text,
    margin: 0,
    padding: 0,
    height: 40,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: theme.red,
    marginTop: 5,
  },
});

export default CustomInput;
