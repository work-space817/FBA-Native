import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import ComponentsLayout from "../../../../core/layouts/components/ComponentsLayout";
import PieDiagram from "./PieDiagram";

const GoalPieDiagram = memo(() => {
  return (
    <ComponentsLayout title="Goal Status Diagram">
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
