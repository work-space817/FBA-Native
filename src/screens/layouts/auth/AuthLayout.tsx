import React, { ReactNode } from "react";
import { View, Text, StyleSheet, ViewProps, ViewStyle } from "react-native";

interface AuthLayoutProps extends ViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
const AuthLayout = ({ children, style }: AuthLayoutProps) => {
  return <View style={[styles.outterLayout, style]}>{children}</View>;
};
const styles = StyleSheet.create({
  outterLayout: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AuthLayout;
