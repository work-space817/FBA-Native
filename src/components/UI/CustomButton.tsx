import React, { FC, memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

interface ICustomButtom extends TouchableOpacityProps {
  title: string;
  theme?: "none" | "primary" | "secondary";
  onPress?: (e: any) => void;
}

const CustomButton: FC<ICustomButtom> = memo(
  ({ children, title, style, theme = "none", onPress }) => {
    const buttonStyles: ViewStyle = styles[theme] || styles.none;
    const textStyles = styles[`${theme}Text`] || styles.noneText;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, buttonStyles, style]}
      >
        {children}
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
  },
  none: {
    backgroundColor: "rgb(255,245,250)",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
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
    backgroundColor: "rgba(110,115,125,1)",
  },
  secondaryText: {
    color: "rgb(255,255,255)",
  },
});
export default CustomButton;
