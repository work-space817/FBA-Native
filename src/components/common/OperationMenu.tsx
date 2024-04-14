import React from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomModal from "../UI/CustomModal";
import GoalAdd from "../goals/GoalAdd";
import TransactionAdd from "../transactions/TransactionAdd";

const OperationMenu = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.children}>
        <Text style={styles.text}>Goals</Text>
        <CustomModal title={"New"}>
          <GoalAdd />
        </CustomModal>
      </View>
      <View style={styles.children}>
        <CustomModal title={"Add income"}>
          <TransactionAdd transactionType={"Income transaction"} />
        </CustomModal>
        <CustomModal title={"Add outcome"}>
          <TransactionAdd transactionType={"Outcome transaction"} />
        </CustomModal>
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
