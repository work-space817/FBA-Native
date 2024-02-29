import { FC, useState } from "react";
import { View, StyleSheet, ViewProps, LayoutChangeEvent } from "react-native";

interface IComponentsLayout extends ViewProps {}

const ComponentsLayout: FC<IComponentsLayout> = ({
  style,
  children,
  onLayout,
}) => {
  return (
    <View onLayout={onLayout} style={[styles.layout, style]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    backgroundColor: "rgb(255,245,250)",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    marginVertical: 15,
  },
});

export default ComponentsLayout;
