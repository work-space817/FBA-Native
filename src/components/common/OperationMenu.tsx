import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";

const OperationMenu = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.children}>
        <Text style={styles.text}>Goals</Text>
        <CustomButton title={"New"} theme={"primary"} />
      </View>
      <View style={styles.children}>
        <CustomButton title={"Add income"} theme={"primary"} />
        <CustomButton title={"Add outcome"} theme={"primary"} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  children: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
});
export default OperationMenu;
