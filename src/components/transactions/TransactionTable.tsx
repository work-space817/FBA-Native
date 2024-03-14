import {
  Dimensions,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  ICalendarDatesRangeActionType,
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
import GeneralSVG from "../../helpers/SVG/common/GeneralSVG";
import CustomButton from "../UI/CustomButton";
import CalendarSVG from "../../helpers/SVG/common/CalendarSVG";

const TransactionTable = memo(() => {
  const { transactionList, isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList as ITransactionList
  );
  const { datesRange } = useSelector((store: RootState) => store.datesRange);
  // console.log("datesRange 1: ", datesRange);
  const dispatch = useDispatch();
  const defaulRequestLimit = 25;
  const [requestLimit, setRequestLimit] = useState(defaulRequestLimit);
  const { loading, amountTransaction } = TransactionList(requestLimit);
  const [searchTransactionTitle, setSearchTransactionTitle] = useState("");
  const [searchedList, setSearchedList] = useState<ITransaction[]>([
    ...transactionList,
  ]);
  const [sortedList, setSortedList] = useState([...transactionList]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setSortedList(transactionList);
    dispatch({ type: ScrollViewPositionActionType.SET_POSITION, payload: 350 });
  }, [transactionList]);
  useEffect(() => {
    setRequestLimit(defaulRequestLimit);
  }, [isUpdatedList === true]);

  const searchTransactionByDates = () => {
    setRequestLimit(999);
    const searchedByDates = sortedList.filter((transaction) => {
      if (datesRange.endDate) {
        return (
          transaction.transactionDate >= datesRange.startDate &&
          transaction.transactionDate <= datesRange?.endDate
        );
      } else {
        return transaction.transactionDate === datesRange.startDate;
      }
    });
    console.log("datesRange 2: ", datesRange);
    setSearchedList(searchedByDates);
  };

  const searchTransactionByTitle = useMemo(() => {
    if (searchTransactionTitle) {
      setRequestLimit(999);
    }
    const searchedByTitle = sortedList.filter((transaction) =>
      transaction.transactionTitle
        .toLowerCase()
        .includes(searchTransactionTitle.toLowerCase())
    );
    setSearchedList(searchedByTitle);
  }, [searchTransactionTitle, sortedList]);

  useEffect(() => {
    searchTransactionByDates();
  }, [datesRange]);

  const sortedTransactions = searchedList.sort(
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
  const onPress = (e: GestureResponderEvent) => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE,
    });
  };

  let isDate;
  const isStartDate =
    datesRange.startDate !== "1970-01-01" ? datesRange.startDate : 0;
  const isEndDate = datesRange.endDate ? datesRange.endDate : 0;
  const startingDate = format(isStartDate, "dd.MM.yyyy");
  const endingDate = format(isEndDate, "dd.MM.yyyy");

  if (isStartDate !== 0 && isEndDate !== 0) {
    isDate = `${startingDate} - ${endingDate}`;
  } else if (isStartDate !== 0 && isEndDate == 0) {
    isDate = `${startingDate}`;
  } else {
    isDate = `All time`;
  }

  return (
    <ComponentsLayout style={[styles.layoutEnd]}>
      <CalendarWithRange
        style={styles.calendarLayout}
        onDismiss={searchTransactionByDates}
      />
      <View style={[styles.headerLayout, { zIndex: 1 }]}>
        <View style={styles.headerFilters}>
          <Text style={styles.titleText}>Transaction History</Text>
          <View style={[styles.headerFilters, { gap: 5 }]}>
            <CustomButton style={styles.searchButton}>
              <GeneralSVG id={"Hash"} width={22} height={16} />
            </CustomButton>
            <CustomButton
              theme="none"
              onPress={() => {}}
              style={[{ borderRadius: 10, padding: 10 }]}
            >
              <CalendarSVG id="Calendar" width={15} height={15} />
            </CustomButton>
            <CustomButton style={styles.searchButton} onPress={onPress}>
              <Text style={[styles.titleColor, { paddingHorizontal: 5 }]}>
                Clear
              </Text>
            </CustomButton>
          </View>
        </View>
        <View style={styles.headerFilters}>
          <Text style={[styles.titleByDate, styles.titleColor]}>{isDate}</Text>
          <CustomInput
            layoutStyle={{ width: "50%", marginBottom: 0 }}
            style={{ height: 30 }}
            value={searchTransactionTitle}
            onChange={(e) => setSearchTransactionTitle(e)}
            placeholder={"Search"}
          />
        </View>
      </View>

      <ScrollView
        style={{ height: tableHeight, zIndex: 1 }}
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
  headerLayout: {
    paddingTop: 5,
    gap: 10,
    paddingHorizontal: 5,
  },
  headerFilters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  layoutEnd: {
    flex: 1,
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
  titleColor: {
    color: "rgba(0,0, 0, 0.6)",
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
    // position: "absolute",
    // left: -100,
    right: 0,
    top: 30,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});
