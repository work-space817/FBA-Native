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
import {
  ITransactionList,
  ScrollViewPositionActionType,
} from "../../store/reducers/types";
import TransactionList from "./TransactionList";
import { RootState } from "../../store";
import Transaction from "./Transaction";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomInput from "../UI/CustomInput";
import { ITransaction } from "./types";
import { parse } from "date-fns/parse";
import { format } from "date-fns";
import CustomLoadingAnimation from "../UI/CustomLoadingAnimation";
import { useDispatch } from "react-redux";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";

const TransactionTable = memo(() => {
  const { transactionList, isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const { datesRange } = useSelector((store: RootState) => store.datesRange);
  console.log("datesRange: ", datesRange);
  const defaulRequestLimit = 15;
  const [requestLimit, setRequestLimit] = useState(defaulRequestLimit);
  const { loading, amountTransaction } = TransactionList(requestLimit);
  const [searchTransactionList, setSearchTransactionList] = useState("");
  const [searchTransactionByDates, setSearchTransactionByDates] =
    useState(false);
  console.log("searchTransactionByDates: ", searchTransactionByDates);
  const [sortedList, setSortedList] = useState([...transactionList]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setSortedList(transactionList);
    dispatch({ type: ScrollViewPositionActionType.SET_POSITION, payload: 350 });
  }, [transactionList]);
  useEffect(() => {
    setRequestLimit(defaulRequestLimit);
  }, [isUpdatedList === true]);

  const searchTransaction = useMemo(() => {
    if (searchTransactionList) {
      setRequestLimit(999);
    }
    console.log("first");
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

  let tableHeight: number;
  if (Platform.OS === "ios") {
    tableHeight = windowHeight - 250;
  } else {
    tableHeight = windowHeight - statusBarHeight - 150;
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  useEffect(() => {
    const limitHeight = 63 * requestLimit;
    //! console.log("summary", limitHeight - (tableHeight + scrollPosition));
    if (limitHeight - (tableHeight + scrollPosition) < 500) {
      console.log("LIMIT");
      setRequestLimit(requestLimit + 5);
    }
  }, [scrollPosition]);

  return (
    <ComponentsLayout style={[styles.layoutEnd]}>
      <View style={styles.layoutStickyHeader}>
        <Text style={styles.titleText}>Transaction History</Text>
        <View style={{ width: "30%", flexDirection: "row", gap: 5 }}>
          <CustomInput
            style={{ height: 30 }}
            value={searchTransactionList}
            onChange={(e) => setSearchTransactionList(e)}
            placeholder={"Search"}
          />
          <CalendarWithRange
            style={styles.calendarLayout}
            buttonStyle={{ marginBottom: 10 }}
          />
        </View>
      </View>

      <ScrollView
        style={{ height: tableHeight }}
        onScroll={handleScroll}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {!isUpdatedList && <>{visibleTransactionList}</>}
        {requestLimit > amountTransaction && !loading ? (
          <View style={styles.layoutByDate}>
            <Text style={styles.titleByDate}>
              Transactions were not done before
            </Text>
          </View>
        ) : (
          <CustomLoadingAnimation />
        )}
      </ScrollView>
    </ComponentsLayout>
  );
});

export default TransactionTable;

const styles = StyleSheet.create({
  layoutStickyHeader: {
    flexDirection: "row",
    // justifyContent: "space-between",
    gap: 40,
    paddingTop: 5,
    paddingHorizontal: 5,
    zIndex: 999,
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
  calendarLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: 250,
    position: "absolute",
    left: -100,
    top: 20,
    zIndex: 999,
  },
});
