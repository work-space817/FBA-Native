import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ITransactionList } from "../../store/reducers/types";
import TransactionList from "./TransactionList";
import { RootState } from "../../store";
import Transaction from "./Transaction";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomInput from "../UI/CustomInput";
import { ITransaction } from "./types";
import { parse } from "date-fns/parse";
import { format, parseISO } from "date-fns";

const TransactionTable = () => {
  const [searchTransactionList, setSearchTransactionList] = useState("");
  const fetchTransactionsData = TransactionList();
  const { transactionList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  useEffect(() => {
    setSortedList(transactionList);
  }, [transactionList]);
  const [sortedList, setSortedList] = useState([...transactionList]);

  const searchTransaction = useMemo(() => {
    return sortedList.filter((transaction) =>
      transaction.transactionTitle
        .toLowerCase()
        .includes(searchTransactionList.toLowerCase())
    );
  }, [searchTransactionList, sortedList]);

  const sortedTransactions = sortedList.sort(
    (a: ITransaction, b: ITransaction) => {
      const dateA = parse(a.transactionDate, "dd.MM.yyyy", new Date());
      const dateB = parse(b.transactionDate, "dd.MM.yyyy", new Date());

      return dateB.getTime() - dateA.getTime();
    }
  );
  const groupedTransactions = sortedTransactions.reduce(
    (acc: any, transaction) => {
      const date = transaction.transactionDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {}
  );
  console.log(
    "groupedTransactions",
    JSON.stringify(groupedTransactions, null, 2)
  );

  const visibleTransactionList = Object.entries(groupedTransactions).map(
    ([date, transactionsInDay]: any) => {
      transactionsInDay.sort((a: any, b: any) => {
        const [hoursA, minutesA] = a.transactionTime.split(":").map(Number);
        const [hoursB, minutesB] = b.transactionTime.split(":").map(Number);
        return hoursB - hoursA || minutesB - minutesA;
      });
      const [day, month, year] = date.split(".");
      const dateObject = new Date(`${year}-${month}-${day}`);
      const formattedDate = format(dateObject, "dd MMMM yyyy");
      return (
        <View style={styles.layoutByDate} key={date}>
          <Text style={styles.titleByDate}>{formattedDate}</Text>
          <View style={styles.layoutTransactionByDate}>
            {transactionsInDay.map((transaction: ITransaction) => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </View>
        </View>
      );
    }
  );

  return (
    <ComponentsLayout>
      <View style={styles.layout}>
        <Text style={styles.titleText}>Transaction History</Text>
        <View style={{ width: "30%" }}>
          <CustomInput
            style={{ height: 30 }}
            value={searchTransactionList}
            onChange={(e) => setSearchTransactionList(e.text)}
            placeholder={"Search"}
          />
        </View>
      </View>
      {visibleTransactionList}
    </ComponentsLayout>
  );
};

export default TransactionTable;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  layoutByDate: {
    marginVertical: 10,
    alignItems: "center",
    gap: 5,
  },
  titleByDate: {
    fontSize: 14,
    fontFamily: "Quicksand_700Bold",
  },
  layoutTransactionByDate: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.2)",
    borderStyle: "solid",
  },
});
