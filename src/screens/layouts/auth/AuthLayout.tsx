import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  ViewStyle,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface AuthLayoutProps extends ViewProps {
  children: ReactNode;
  style?: ViewStyle;
}
const AuthLayout = ({ children, style }: AuthLayoutProps) => {
  return (
    <KeyboardAwareScrollView
      extraHeight={100}
      keyboardDismissMode="on-drag"
      // enableResetScrollToCoords={false}
      enableOnAndroid={true}
      keyboardOpeningTime={0}
      contentContainerStyle={[styles.outterLayout, style]}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  outterLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AuthLayout;
