import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import useBalanceController from "./useBalanceController";
import { useTheme } from "../../core/themes/useTheme";

const theme = useTheme();

const BalanceView = memo(() => {
  const { balance } = useBalanceController();

  return (
    <View style={styles.layout}>
      <View style={styles.column}>
        <Text style={styles.currentBalanceText}>
          &#8372; {balance.currentBalance}
        </Text>
        <Text style={styles.descriptionText}>Current balance</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.incomeBalanceText}>
          &#8372; {balance.incomeBalance}
        </Text>
        <Text style={styles.descriptionText}>Income balance</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.outcomeBalanceText}>
          &#8372; {balance.outcomeBalance}
        </Text>
        <Text style={styles.descriptionText}>Outcome balance</Text>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  layout: {
    paddingLeft: 16,
    borderColor: theme.border,
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
    color: theme.text,
    textAlign: "right",
  },
  incomeBalanceText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: theme.green,
    textAlign: "right",
  },
  outcomeBalanceText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    color: theme.red,
    textAlign: "right",
  },
  descriptionText: {
    fontSize: 12,
    color: theme.subText,
    fontFamily: "Quicksand_500Medium",
  },
});

export default BalanceView;
