import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  ViewStyle,
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface ICustomButtonWithoutFeedback extends TouchableWithoutFeedbackProps {
  title: string;
  theme?: "none" | "primary" | "secondary";
  onPress?: (e: any) => void;
}

const CustomButtonWithoutFeedback: FC<ICustomButtonWithoutFeedback> = ({
  children,
  title,
  style,
  theme = "none",
  onPress,
}) => {
  const buttonStyles: ViewStyle = styles[theme] || styles.none;
  const textStyles = styles[`${theme}Text`] || styles.noneText;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, style, buttonStyles]}>
        {children}
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 0,
    alignItems: "center",
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
  },
  none: {
    backgroundColor: "rgb(255,255,255)",
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
export default CustomButtonWithoutFeedback;