import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface IComponentsLayout {
  children: ReactNode;
}

const ComponentsLayout = ({ children }: IComponentsLayout) => {
  return <View style={styles.layout}>{children}</View>;
};
const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default ComponentsLayout;
