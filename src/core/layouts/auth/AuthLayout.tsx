import { Dimensions, StyleSheet, Text, View, ViewProps } from "react-native";
import React, { FC } from "react";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
import { useTheme } from "../../themes/useTheme";

interface IAuthLayout extends ViewProps {
  subtitle?: string;
}
const theme = useTheme();

const AuthLayout: FC<IAuthLayout> = (props) => {
  const { height } = Dimensions.get("window");
  return (
    <View {...props} style={styles.defaultStyle}>
      <View style={[styles.defaultInfo, { marginTop: height * 0.2 }]}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Welcome to FBA</Text>
          <HeaderSVG id="Cloud" width={43} height={38} />
        </View>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      {props.children}
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: theme.background,
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
    gap: 40,
  },
  defaultInfo: {
    gap: 8,
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 28.8,
    color: theme.text,
  },
  subtitle: {
    color: theme.subText,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: "center",
  },
});
