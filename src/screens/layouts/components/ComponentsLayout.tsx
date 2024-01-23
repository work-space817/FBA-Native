import { FC } from "react";
import { View, StyleSheet, DimensionValue, ViewProps } from "react-native";

interface IComponentsLayout extends ViewProps {}

const ComponentsLayout: FC<IComponentsLayout> = ({ style, children }) => {
  return <View style={[styles.layout, style]}>{children}</View>;
};
const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default ComponentsLayout;
