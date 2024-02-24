import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
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

const TransactionTable = memo(() => {
  const [requestLimit, setRequestLimit] = useState(15);
  console.log("requestLimit: ", requestLimit);
  const fetchTransactionData = TransactionList(requestLimit);
  const { transactionList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const [searchTransactionList, setSearchTransactionList] = useState("");
  const [sortedList, setSortedList] = useState([...transactionList]);

  useEffect(() => {
    setSortedList(transactionList);
  }, [transactionList]);
  const searchTransaction = useMemo(() => {
    if (searchTransactionList) {
      setRequestLimit(999);
    }
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
      const sortedByTime = transactionsInDay.sort((a: any, b: any) => {
        const [hoursA, minutesA] = a.transactionTime.split(":").map(Number);
        const [hoursB, minutesB] = b.transactionTime.split(":").map(Number);
        return hoursB - hoursA || minutesB - minutesA;
      });
      const formattedDate = format(date, "dd MMMM yyyy");
      return (
        <View style={styles.layoutByDate} key={date}>
          <Text style={styles.titleByDate}>{formattedDate}</Text>
          <View style={styles.layoutTransactionByDate}>
            {sortedByTime.map((transaction: ITransaction) => (
              <Transaction key={transaction.id} {...transaction} />
            ))}
          </View>
        </View>
      );
    }
  );

  const windowHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const tableHeight =
    Platform.OS === "ios"
      ? windowHeight - 275
      : windowHeight - statusBarHeight - 150;

  const [scrollPosition, setScrollPosition] = useState(0); //! 2.
  const limitHeight = 2000; //! 3.
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
    const tableHeight = event.nativeEvent.layoutMeasurement.height; //! 1.
    console.log("tableHeight: ", tableHeight);
    console.log("summary", tableHeight + scrollPosition);
  };
  // console.log("scrollPosition: ", scrollPosition);

  useEffect(() => {
    if (limitHeight - (tableHeight + scrollPosition) < 1250) {
      console.log("LIMIT");
      setRequestLimit(requestLimit + 1);
    }
  }, [scrollPosition]);

  return (
    <ComponentsLayout style={[styles.layoutEnd]}>
      <View style={styles.layoutStickyHeader}>
        <Text style={styles.titleText}>Transaction History</Text>
        <View style={{ width: "30%" }}>
          <CustomInput
            style={{ height: 30 }}
            value={searchTransactionList}
            onChange={(e) => setSearchTransactionList(e)}
            placeholder={"Search"}
          />
        </View>
      </View>
      {/* {!fetchTransactionData ? ( */}
      <ScrollView
        style={{ height: tableHeight }}
        onScroll={handleScroll}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        // bounces={false}
        scrollEventThrottle={16}
      >
        {visibleTransactionList}
        <CustomLoadingAnimation />
      </ScrollView>
    </ComponentsLayout>
  );
});

export default TransactionTable;

const styles = StyleSheet.create({
  layoutStickyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingHorizontal: 12,
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
