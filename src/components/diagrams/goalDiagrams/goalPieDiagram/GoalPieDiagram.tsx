import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import ComponentsLayout from "../../../../screens/layouts/components/ComponentsLayout";
import PieDiagram from "./PieDiagram";

const GoalPieDiagram = memo(() => {
  return (
    <ComponentsLayout>
      <Text style={styles.titleText}>Goal Status Diagram</Text>
      <PieDiagram />
    </ComponentsLayout>
  );
});

export default GoalPieDiagram;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
});
