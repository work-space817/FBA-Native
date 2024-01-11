import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <View style={styles.outterLayout}>{children}</View>;
};
const styles = StyleSheet.create({
  outterLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AuthLayout;
