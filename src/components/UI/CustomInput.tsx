import React, { FC, memo } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  field?: string;
  label?: string;
  clientSideError?: string;
  touched?: boolean;
  layoutStyle?: ViewStyle;
}

const CustomInput: FC<CustomInputProps> = ({ ...props }) => {
  console.log("props: ");
  const border = props.clientSideError && props.touched ? "red" : "gray";
  return (
    <View style={[styles.layout, props.layoutStyle]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
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
    marginBottom: 5,
  },
  input: {
    margin: 0,
    padding: 0,
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
