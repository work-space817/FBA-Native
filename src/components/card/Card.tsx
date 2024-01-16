import React from "react";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { View, StyleSheet, Text } from "react-native";

const Card = () => {
  return (
    <ComponentsLayout>
      <Text style={styles.text}>Card</Text>
    </ComponentsLayout>
  );
};
const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
});
export default Card;
