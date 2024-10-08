import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import GoalSVG from "../../helpers/SVG/UI/GoalSVG";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import CustomModal from "../UI/CustomModal";
import GoalAdd from "./GoalAdd";
import { useTheme } from "../../core/themes/useTheme";

const theme = useTheme();

const GoalEmpty = memo(() => {
  return (
    <ComponentsLayout style={styles.layout}>
      <CustomModal
        theme="transparent"
        customActive={<GoalSVG id="Empty" width="40" height="40" />}
      >
        <GoalAdd />
      </CustomModal>
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
    gap: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Quicksand_700Bold",
    color: theme.text,
  },
});

export default GoalEmpty;
