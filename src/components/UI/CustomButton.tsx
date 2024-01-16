import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from "react-native";

interface ICustomButtom {
  title: string;
  theme?: "none" | "primary" | "secondary";
  onPress?: (e: any) => void;
}

const CustomButton = ({ title, theme = "none", onPress }: ICustomButtom) => {
  const buttonStyles: ViewStyle = styles[theme] || styles.none;
  const textStyles = styles[`${theme}Text`] || styles.noneText;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyles]}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 0,
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
  },
  none: {
    backgroundColor: "rgb(225,225,225)",
  },
  noneText: {
    color: "rgb(0,0,0)",
  },
  primary: {
    backgroundColor: "rgba(126,76,215,.75)",
  },
  primaryText: {
    color: "rgb(255,255,255)",
  },
  secondary: {
    backgroundColor: "rgba(126,76,215,.75)",
  },
  secondaryText: {
    color: "rgb(255,255,255)",
  },
});
export default CustomButton;
