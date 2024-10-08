import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomModal from "../../UI/CustomModal";
import GoalAdd from "../../goals/GoalAdd";
import TransactionAdd from "../../transactions/TransactionAdd";
import { Categories } from "../category/types";
import { useTheme } from "../../../core/themes/useTheme";

const theme = useTheme();

const OperationMenu = memo(() => {
  return (
    <View style={styles.layout}>
      <View style={styles.children}>
        <Text style={styles.text}>Goals</Text>
        <CustomModal theme="primary" title={"New"}>
          <GoalAdd />
        </CustomModal>
      </View>
      <View style={styles.children}>
        <CustomModal theme="primary" title={"Add income"}>
          <TransactionAdd transactionType={Categories.incomeTransaction} />
        </CustomModal>
        <CustomModal theme="primary" title={"Add outcome"}>
          <TransactionAdd transactionType={Categories.outcomeTransaction} />
        </CustomModal>
      </View>
    </View>
  );
});
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
    color: theme.text,
  },
});
export default OperationMenu;
