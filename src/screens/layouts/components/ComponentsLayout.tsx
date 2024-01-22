import { ReactNode } from "react";
import { View, StyleSheet, DimensionValue } from "react-native";

interface IComponentsLayout {
  children: ReactNode;
  width?: DimensionValue;
  marginVertical?: DimensionValue;
  marginHorizontal?: DimensionValue;
}

const ComponentsLayout = ({
  children,
  width,
  marginVertical,
  marginHorizontal,
}: IComponentsLayout) => {
  return (
    <View
      style={[
        styles.layout,
        {
          width: width,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
        },
      ]}
    >
      {children}
    </View>
  );
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
