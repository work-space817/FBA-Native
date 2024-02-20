import { FC, useState } from "react";
import { View, StyleSheet, ViewProps } from "react-native";

interface IComponentsLayout extends ViewProps {}

const ComponentsLayout: FC<IComponentsLayout> = ({
  style,
  children,
  onLayout,
}) => {
  const handleLayout = (event: any) => {
    const paramert = event.nativeEvent;
    if (onLayout) {
      onLayout(paramert);
    }
  };
  return (
    <View onLayout={handleLayout} style={[styles.layout, [style]]}>
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
