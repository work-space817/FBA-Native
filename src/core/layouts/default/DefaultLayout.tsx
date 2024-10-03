import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import React, { FC } from "react";
export interface IDefaultLayout extends ViewProps {
  outterStyle?: ViewStyle;
}

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
    backgroundColor: "rgba(140,0,255,.1)",
    flex: 1,
  },
  innerLayout: {
    flex: 1,
    // paddingTop: 40,
    paddingHorizontal: 16,
  },
});
