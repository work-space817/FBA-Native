import React, { FC, memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TouchableOpacityProps,
  GestureResponderEvent,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

interface ICustomButtom extends TouchableWithoutFeedbackProps {
  titleStyle?: TextStyle;
  title?: string;
  theme?: "none" | "primary" | "secondary";
  onPress: (e: any) => void;
}

const CustomButtonWithoutFeedback: FC<ICustomButtom> = ({
  theme = "none",
  ...props
}) => {
  const buttonStyles: ViewStyle = styles[theme];
  const textStyles = styles[`${theme}Text`];
  return (
    <TouchableWithoutFeedback
      {...props}
      onPress={props.onPress}
      style={[styles.button, buttonStyles, props.style]}
    >
      {props.children}
      {props.title && (
        <Text style={[styles.text, textStyles, props.titleStyle]}>
          {props.title}
        </Text>
      )}
    </TouchableWithoutFeedback>
  );
};
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
    margin: 0,
    padding: 0,
    lineHeight: 17,
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
export default CustomButtonWithoutFeedback;
