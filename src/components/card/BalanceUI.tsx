import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserBalance from "./UserBalance";
import { useSelector } from "react-redux";
import { IUserBalance } from "../../store/reducers/types";

const BalanceUI = () => {
  const fetchUserBalanceData = UserBalance();
  const { balance } = useSelector(
    (store: any) => store.userBalance as IUserBalance
  );

  return (
    <View style={styles.layout}>
      <View style={styles.column}>
        <Text style={styles.currentBalanceText}>
          &#8372; {balance?.currentBalance}
        </Text>
        <Text style={styles.descriptionText}>Current balance</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.incomeBalanceText}>
          &#8372; {balance?.incomingBalance}
        </Text>
        <Text style={styles.descriptionText}>Income balance</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.outcomeBalanceText}>
          &#8372; {balance?.outcomingBalance}
        </Text>
        <Text style={styles.descriptionText}>Outcome balance</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    paddingLeft: 16,
    borderColor: "rgb(222 226 230)",
    borderLeftWidth: 1,
    borderStyle: "solid",
    alignItems: "flex-end",
    gap: 14,
  },
  column: {
    flexDirection: "column",
    textAlign: "right",
  },
  currentBalanceText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 20,
    color: "blue",
    textAlign: "right",
  },
  incomeBalanceText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: "green",
    textAlign: "right",
  },
  outcomeBalanceText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: "red",
    textAlign: "right",
  },
  descriptionText: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: "Quicksand_500Medium",
  },
});

export default BalanceUI;
