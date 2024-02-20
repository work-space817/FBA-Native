import {
  Dimensions,
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ITransactionList,
  ScrollEnableActionType,
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

const TransactionTable = () => {
  const fetchTransactionsData = TransactionList(20);
  const { transactionList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const dispatch = useDispatch();
  const [requestLimit, setRequestLimit] = useState(1);
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
  const totalHeight = 2000;
  const [customLayoutHeight, setCustomLayouHeighth] = useState<number>(0);
  const windowHeight = Dimensions.get("window").height;
  const handleCustomLayout = useCallback((height: any) => {
    setCustomLayouHeighth(height.layout.height);
  }, []);
  // useEffect(() => {
  //   console.log("totalHeight: ", totalHeight);
  //   console.log("customLayoutHeight: ", customLayoutHeight);
  //   console.log("windowHeight", windowHeight);
  // }, [customLayoutHeight]);
  const { childrenScrolling } = useSelector(
    (store: RootState) => store.scrollEnable
  );

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
  };
  useEffect(() => {
    if (scrollPosition <= 5) {
      dispatch({ type: ScrollEnableActionType.PARENTS_SCROLLING_TRUE });
    } else {
      dispatch({ type: ScrollEnableActionType.CHILDREN_SCROLLING_TRUE });
    }
  }, [scrollPosition]);
  console.log("isScrolling in table", childrenScrolling);
  console.log("scrollPosition in table", scrollPosition);
  return (
    <ComponentsLayout onLayout={handleCustomLayout}>
      <View style={styles.layout}>
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
      {!fetchTransactionsData ? (
        <ScrollView
          style={{ height: 750 }}
          // onScroll={handleScroll}
          // onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          //   console.log(e.nativeEvent.contentOffset.y)
          // }
          // scrollEnabled={childrenScrolling}
          nestedScrollEnabled={true}
        >
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
  container: {
    flex: 1,
  },
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
