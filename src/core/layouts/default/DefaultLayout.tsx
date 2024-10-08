import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import React, { FC } from "react";
import { useTheme } from "../../themes/useTheme";
export interface IDefaultLayout extends ViewProps {
  outterStyle?: ViewStyle;
}

const theme = useTheme();

const DefaultLayout: FC<IDefaultLayout> = (props) => {
  return (
    <View style={[styles.outerLayout, props.outterStyle]}>
      <View {...props} style={[styles.innerLayout, props.style]}>
        {props.children}
      </View>
    </View>
  );
};

export default DefaultLayout;

const styles = StyleSheet.create({
  outerLayout: {
    backgroundColor: theme.background,
    flex: 1,
  },
  innerLayout: {
    flex: 1,
    // paddingTop: 40,
    paddingHorizontal: 16,
  },
});
