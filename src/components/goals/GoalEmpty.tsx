import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import GoalSVG from "../../helpers/SVG/UI/GoalSVG";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomModal from "../UI/CustomModal";

const GoalEmpty = memo(() => {
  return (
    <ComponentsLayout style={styles.layout}>
      <View>
        <GoalSVG id="Empty" width="40" height="40" />
      </View>
      <View>
        <Text style={styles.title}>New goal</Text>
      </View>
    </ComponentsLayout>
  );
});
const styles = StyleSheet.create({
  layout: {
    width: 105,
    marginHorizontal: 10,
    marginVertical: 15,
    gap: 32,
    paddingVertical: 22,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
  },
});

export default GoalEmpty;
