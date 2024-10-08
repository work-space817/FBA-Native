import React, { FC, memo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../core/themes/useTheme";

const themes = useTheme();

interface ICustomButtom extends TouchableOpacityProps {
  label?: string;
  titleStyle?: TextStyle;
  title?: string;
  theme?: "none" | "primary" | "secondary" | "transparent";
  onPress: (e: any) => void;
}

const CustomButton: FC<ICustomButtom> = ({ theme = "none", ...props }) => {
  const buttonStyles = themes.button[theme]?.background;
  const borderStyles = themes.button[theme]?.border;
  const textStyles = themes.button[theme]?.text;

  return (
    <>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TouchableOpacity
        {...props}
        onPress={props.onPress}
        style={[
          styles.button,
          { backgroundColor: buttonStyles, borderColor: borderStyles },

          props.style,
        ]}
      >
        {props.children}
        {props.title && (
          <Text style={[styles.text, { color: textStyles }, props.titleStyle]}>
            {props.title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
    margin: 0,
    padding: 0,
    lineHeight: 17,
  },
  label: {
    color: themes.text,
    marginBottom: 5,
  },
});
export default CustomButton;
