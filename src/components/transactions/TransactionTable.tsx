import React, { memo, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { format } from "date-fns";
import TransactionList from "./TransactionList";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomInput from "../UI/CustomInput";
import CustomLoadingAnimation from "../UI/CustomLoadingAnimation";
import CustomButton from "../UI/CustomButton";
import CalendarWithRange from "../../lib/react-native-calendars/CalendarWithRange";
import ShowSelectedDates from "../../helpers/functions/UI/ShowSelectedDates";
import Transaction from "./Transaction";
import GeneralSVG from "../../helpers/SVG/common/GeneralSVG";
import CalendarSVG from "../../helpers/SVG/common/CalendarSVG";
import {
  ICalendarDatesRangeActionType,
  ScrollViewPositionActionType,
  TransactionListActionType,
} from "../../store/reducers/types";
import { RootState } from "../../store";
import { ITransaction } from "./types";

const TransactionTable = memo(() => {
  const dispatch = useDispatch();

  const { isUpdatedList } = useSelector(
    (store: RootState) => store.transactionList
  );

  const defaulRequestLimit = 25;
  const [requestLimit, setRequestLimit] = useState<any>(defaulRequestLimit);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchTransactionTitle, setSearchTransactionTitle] = useState("");
  const [dateRange, setDateRange] = useState<any[]>([undefined, undefined]);

  const { loading, transactionList, amountTransaction } = TransactionList(
    ...dateRange,
    requestLimit
  );
  const [searchedList, setSearchedList] =
    useState<ITransaction[]>(transactionList);

  console.log("requestLimit: ", requestLimit);
  console.log("isUpdatedList: ", isUpdatedList);
  console.log("transactionList: ", transactionList.length);

  useEffect(() => {
    dispatch({ type: ScrollViewPositionActionType.SET_POSITION, payload: 350 });
  }, []);
  useEffect(() => {
    setSearchedList(transactionList);
  }, [transactionList]);

  const searchTransactionByDates = (e: any) => {
    const transactionList = dispatch({
      type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
      payload: false,
    });
    setRequestLimit(undefined);
    setDateRange([e.startDate, e.endDate]);
  };

  const searchTransactionByTitle = useMemo(() => {
    if (searchTransactionTitle) {
      setRequestLimit(undefined);
      setDateRange([undefined, undefined]);
    }
    const searchedByTitle = searchedList.filter((transaction) =>
      transaction.transactionTitle
        .toLowerCase()
        .includes(searchTransactionTitle.toLowerCase())
    );
    setSearchedList(searchedByTitle);
  }, [searchTransactionTitle, transactionList]);

  const groupedTransactions = searchedList.reduce((acc: any, transaction) => {
    const date = transaction.transactionDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
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
    if (event.nativeEvent.contentOffset.y >= scrollPosition) {
      setScrollPosition(event.nativeEvent.contentOffset.y);
    }
  };
  useEffect(() => {
    const limitHeight = 63 * requestLimit;
    //? console.log("summary", limitHeight - (tableHeight + scrollPosition));
    if (limitHeight - (tableHeight + scrollPosition) < 500) {
      console.log("LIMIT");
      setRequestLimit(requestLimit + 5);
    }
  }, [scrollPosition]);

  const onDefaultRange = () => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_DEFAULT_DATES_RANGE,
    });
    setSearchTransactionTitle("");
    setRequestLimit(defaulRequestLimit);
    setDateRange([undefined, undefined, defaulRequestLimit]);
  };
  const onOpenCalendar = () => {
    dispatch({
      type: ICalendarDatesRangeActionType.SET_CALENDAR_OPEN,
      payload: true,
    });
  };
  console.log(dateRange);
  return (
    <ComponentsLayout style={styles.layout}>
      <CalendarWithRange
        maskStyle={styles.maskStyle}
        style={styles.calendarLayout}
        onConfirm={searchTransactionByDates}
      />
      <View style={[styles.headerLayout]}>
        <View style={styles.headerFilters}>
          <Text style={styles.titleText}>Transaction History</Text>
          <View style={[styles.headerFilters, { gap: 5 }]}>
            <CustomButton style={styles.searchButton}>
              <GeneralSVG id={"Hash"} width={22} height={16} />
            </CustomButton>
            <CustomButton
              theme="none"
              onPress={onOpenCalendar}
              style={styles.calendarButton}
            >
              <CalendarSVG id="Calendar" width={15} height={15} />
            </CustomButton>
            <CustomButton
              style={[styles.searchButton]}
              onPress={onDefaultRange}
            >
              <Text style={[styles.titleColor, { paddingHorizontal: 5 }]}>
                Clear
              </Text>
            </CustomButton>
          </View>
        </View>
        <View style={styles.headerFilters}>
          <ShowSelectedDates
            dates={{
              startDate: dateRange[0],
              endDate: dateRange[1],
            }}
            style={[styles.titleByDate, styles.titleColor]}
          />
          <CustomInput
            layoutStyle={styles.inputLayoutStyle}
            style={{ height: 30 }}
            value={searchTransactionTitle}
            onFocus={() => setRequestLimit(undefined)}
            onChange={(e) => setSearchTransactionTitle(e)}
            placeholder={"Search"}
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
        {isUpdatedList && <>{visibleTransactionList}</>}
        {loading || requestLimit < amountTransaction ? (
          <CustomLoadingAnimation />
        ) : (
          <View style={styles.layoutByDate}>
            <Text style={styles.titleByDate}>
              Transactions were not done before
            </Text>
          </View>
        )}
      </ScrollView>
    </ComponentsLayout>
  );
});

export default TransactionTable;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 5,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
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
    top: 30,
  },
  calendarButton: {
    borderRadius: 10,
    padding: 10,
  },
  maskStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 2,
    borderRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "flex-end",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  inputLayoutStyle: {
    width: "50%",
    marginBottom: 0,
  },
});
