import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, ButtonProps } from "react-native";

interface ICustomButtom {
  title: string;
  theme?: string;
  color?: string;
  textColor?: string;
  activeVoid?: (e: any) => void;
}

const CustomButton = ({
  title,
  color = "rgba(126,76,215,.75)",
  textColor = "rgb(255,255,255)",
  theme,
  activeVoid,
}: ICustomButtom) => {
  return (
    <TouchableOpacity
      onPress={activeVoid}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingTop: 6,
    padding: 10,
    borderRadius: 15,
    borderWidth: 0,
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
  },
  primary: {},
});
export default CustomButton;
