import {
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ITransactionList } from "../../store/reducers/types";
import TransactionList from "./TransactionList";
import { RootState } from "../../store";
import Transaction from "./Transaction";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomInput from "../UI/CustomInput";
import { ITransaction } from "./types";
import { parse } from "date-fns/parse";
import { format } from "date-fns";
import CustomLoadingAnimation from "../UI/CustomLoadingAnimation";

const TransactionTable = () => {
  const fetchTransactionsData = TransactionList(20);
  const { transactionList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const [requestLimit, setRequestLimit] = useState(1);
  const [customLayoutDimensions, setCustomLayouDimensions] =
    useState<LayoutRectangle>();
  const [searchTransactionList, setSearchTransactionList] = useState("");
  const [sortedList, setSortedList] = useState([...transactionList]);
  useEffect(() => {
    setSortedList(transactionList);
  }, [transactionList]);

  const searchTransaction = useMemo(() => {
    return sortedList.filter((transaction) =>
      transaction.transactionTitle
        .toLowerCase()
        .includes(searchTransactionList.toLowerCase())
    );
  }, [searchTransactionList, sortedList]);

  const sortedTransactions = searchTransaction.sort(
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
  const StickyHeaderComponent = () => (
    <View style={styles.layoutStickyHeader}>
      <Text style={styles.titleText}>Transaction History</Text>
      <View style={{ width: "30%" }}>
        <CustomInput
          style={{ height: 30 }}
          value={searchTransactionList}
          onChangeText={(e) => setSearchTransactionList(e)}
          placeholder={"Search"}
        />
      </View>
    </View>
  );

  const totalHeight = 1400;
  const windowHeight = Dimensions.get("window").height;
  const handleCustomLayout = useCallback((event: LayoutChangeEvent) => {
    setCustomLayouDimensions(event.nativeEvent.layout);
  }, []);
  // useEffect(() => {
  //   console.log("totalHeight: ", totalHeight);
  //   console.log("customLayoutHeight: ", customLayoutHeight);
  //   console.log("windowHeight", windowHeight);
  // }, [customLayoutHeight]);

  console.log("customLayoutDimensions: ", customLayoutDimensions);
  return (
    <ComponentsLayout onLayout={handleCustomLayout} style={[styles.layoutEnd]}>
      <StickyHeaderComponent />
      {!fetchTransactionsData ? (
        <ScrollView style={[styles.layout]} nestedScrollEnabled={true}>
          {visibleTransactionList}
        </ScrollView>
      ) : (
        <View style={{ justifyContent: "center", height: 100, width: 300 }}>
          <CustomLoadingAnimation />
        </View>
      )}
    </ComponentsLayout>
  );
};

export default TransactionTable;

const styles = StyleSheet.create({
  layoutStickyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingHorizontal: 12,
  },
  layout: {
    height: 650,
  },
  layoutEnd: {
    paddingHorizontal: 5,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
