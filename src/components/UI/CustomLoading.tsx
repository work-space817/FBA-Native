import React from "react";
import { View, StyleSheet } from "react-native";
import CustomLoadingAnimation from "./CustomLoadingAnimation";

const CustomLoading = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <CustomLoadingAnimation />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    zIndex: 9999,
    // width: "350%",
    // height: "350%",
    // top: "-50%",
    // left: "-50%",
    // flex: 1,
    position: "absolute",
    backgroundColor: "rgba(220,220,220, 0.9)",
  },
  container: {
    position: "relative",
    top: "40%",
    left: "21%",
  },
});
export default CustomLoading;
