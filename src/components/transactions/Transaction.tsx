import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ITransaction } from "./types";
import CustomButtonWithoutFeedback from "../UI/CustomButtonWithoutFeedback";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import TransactionSVG from "../../helpers/SVG/UI/TransactionSVG";

const Transaction: FC<ITransaction> = ({
  transactionTitle,
  transactionValue,
  transactionTime,
  transactionDate,
  selectedCategories,
  transactionType,
  id,
}) => {
  const transformTitle = () => {
    if (transactionTitle.length > 20) {
      return transactionTitle.substring(0, 10) + "...";
    }
    return transactionTitle;
  };
  const transactionValueType =
    transactionType === "Income transaction" ? "+" : "-";
  return (
    <CustomButtonWithoutFeedback title={""} style={styles.layout}>
      <View style={styles.titleLayout}>
        <TransactionSVG id={transactionType} width={18} height={18} />
        <Text>{transactionTime}</Text>
        <SelectCategoriesSVG id={selectedCategories as string} />
        <Text style={styles.transactionTitleText}>{transformTitle()}</Text>
      </View>
      <View style={styles.valueLayout}>
        <Text style={styles.transactionTitleText}>
          {transactionValueType} {transactionValue} &#8372;
        </Text>
      </View>
    </CustomButtonWithoutFeedback>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  titleLayout: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
    alignItems: "center",
  },
  valueLayout: {
    width: "20%",
    alignItems: "flex-end",
  },
  bordering: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  transactionTitleText: {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
  },
});
