import * as yup from "yup";
import {
  LayoutChangeEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useCallback, useMemo, useState } from "react";
import { ITransactionAdd } from "./types";
import { useDispatch, useSelector } from "react-redux";
import setUserBalance from "../../api/firebase/user/userBalance/setUserBalance";
import {
  ISelectCategories,
  IUserBalance,
  ModalCloserActionType,
  SelectCategoriesActionType,
  TransactionListActionType,
  UserBalanceActionType,
} from "../../store/reducers/types";
import { useFormik } from "formik";
import setTransactionData from "../../api/firebase/transactions/setTransactionData";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import { CalendarList } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/SelectCategories";
import { format } from "date-fns";
import Transaction from "./Transaction";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
interface ITransactionType {
  transactionType: "Income transaction" | "Outcome transaction";
}

const TransactionAdd: FC<ITransactionType> = ({ transactionType }) => {
  const init: ITransactionAdd = {
    transactionTitle: "",
    transactionValue: "",
    transactionTime: "",
    transactionDate: "",
    selectedCategories: "",
    transactionType: transactionType,
  };
  const { selectedCategories } = useSelector(
    (store: any) => store.selectCategories as ISelectCategories
  );
  const { balance } = useSelector(
    (store: any) => store.userBalance as IUserBalance
  );
  const dispatch = useDispatch();
  const today = new Date();
  const defaultTime = format(today, "HH:mm");

  const [calendarWidth, setCalendarWidth] = useState(0);
  const [showCalendarList, setShowCalendarList] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedDay, setSelectedDay] = useState<any>(today);

  const [currentTimeIOS, setCurrentTimeIOS] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setCalendarWidth(width);
  }, []);
  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
    setShowCalendarList(false);
  }, []);

  const handleTimePressIOS = useCallback(
    (event: DateTimePickerEvent, time: any) => {
      setCurrentTimeIOS(time);
    },
    []
  );
  const handleConfirmTimeIOS = () => {
    setShowTimePicker(false);
    const formattedTime = format(currentTimeIOS, "HH:mm");
    setSelectedTime(formattedTime);
  };
  const handleConfirmTimeAndroid = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    setShowTimePicker(false);
    if (selectedTime !== undefined) {
      const formattedTime = format(selectedTime, "HH:mm");
      setSelectedTime(formattedTime);
    }
  };
  const maxDate = format(today, "yyyy-MM-dd");
  const transactionDate = format(selectedDay, "yyyy-MM-dd");
  const formattedDate = format(selectedDay, "dd MMMM yyyy");

  const userBalance = () => {
    if (transactionType === "Income transaction") {
      const changedBalance = {
        currentBalance: balance.currentBalance + +values.transactionValue,
        incomingBalance: balance.incomingBalance + +values.transactionValue,
        outcomingBalance: balance.outcomingBalance,
      };
      setUserBalance(changedBalance);
    }
    if (transactionType === "Outcome transaction") {
      const changedBalance = {
        currentBalance: balance.currentBalance - +values.transactionValue,
        incomingBalance: balance.incomingBalance,
        outcomingBalance: balance.outcomingBalance + +values.transactionValue,
      };
      setUserBalance(changedBalance);
    }
  };

  const timePickerByPlatform =
    Platform.OS === "ios" ? (
      <ComponentsLayout style={styles.timePickerLayout}>
        <View style={{ alignItems: "center" }}>
          <DateTimePicker
            themeVariant="light"
            mode="time"
            display="spinner"
            value={currentTimeIOS}
            onChange={handleTimePressIOS}
            minuteInterval={5}
            style={{
              width: "100%",
            }}
          />
          <CustomButton
            title="Confirm"
            onPress={handleConfirmTimeIOS}
            style={styles.timePickerButton}
            theme="primary"
          />
        </View>
      </ComponentsLayout>
    ) : (
      <DateTimePicker
        mode="time"
        display="spinner"
        value={new Date()}
        onChange={handleConfirmTimeAndroid}
        minuteInterval={5}
        negativeButton={{ label: "Cancel" }}
      />
    );
  const onSubmitHandler = (values: ITransactionAdd) => {
    try {
      userBalance();
      const transactionData = {
        ...values,
        transactionValue: +values.transactionValue,
        transactionTime: selectedTime,
        transactionDate: transactionDate,
        selectedCategories: selectedCategories,
      };
      setTransactionData(transactionData);
      console.log("Нова транзакція успішно створена: ", transactionData);
      const updateTransactionList = dispatch({
        type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
      });
      const updateBalance = dispatch({
        type: UserBalanceActionType.UPDATE_BALANCE,
      });
      const modalCloser = dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: true,
      });
      const unselectedCategory = dispatch({
        type: SelectCategoriesActionType.SELECT_CATEGORIES,
        payload: null,
      });

      handleReset(values);
    } catch (error: any) {
      console.log("Bad request", error);
    }
    const modalCloser = dispatch({
      type: ModalCloserActionType.MODAL_CLOSE,
      payload: false,
    });
  };
  const checkUpForm = yup.object({
    transactionTitle: yup.string().required("Field should not be empty"),
    transactionValue: yup
      .number()
      .positive("Value can not be less than 0")
      .required("Field should not be empty"),
  });
  const formik = useFormik({
    initialValues: init,
    onSubmit: onSubmitHandler,
    validationSchema: checkUpForm,
  });
  const { values, touched, errors, handleSubmit, handleChange, handleReset } =
    formik;
  return (
    <KeyboardAwareScrollView
      extraHeight={75}
      keyboardDismissMode="on-drag"
      keyboardOpeningTime={0}
      onLayout={onLayout}
    >
      <Text style={styles.titleText}>Future transaction</Text>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.titleByDate}>{formattedDate}</Text>

        <Transaction
          transactionTitle={
            values.transactionTitle.length > 0
              ? values.transactionTitle
              : "Future title"
          }
          transactionValue={+values.transactionValue}
          transactionTime={selectedTime}
          transactionDate={""}
          transactionType={transactionType}
          selectedCategories={selectedCategories}
          id={""}
          style={[styles.transactionView]}
        />
      </View>

      <CustomInput
        label="Enter your title"
        field="transactionTitle"
        value={values.transactionTitle}
        keyboardType="email-address"
        onChange={handleChange("transactionTitle")}
        clientSideError={errors.transactionTitle}
        touched={touched.transactionTitle}
      />
      <CustomInput
        label="Enter goals' cost"
        field="transactionValue"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.transactionValue}
        onChange={handleChange("transactionValue")}
        clientSideError={errors.transactionValue}
        touched={touched.transactionValue}
      />

      <Text style={{ marginBottom: 5, marginTop: 0 }}>
        Select transaction time and date
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomButton
          style={styles.expireDateButton}
          title={selectedTime}
          theme="none"
          onPress={() => setShowTimePicker(true)}
        />
        <CustomButton
          style={styles.expireDateButton}
          title={formattedDate}
          theme="none"
          onPress={() => setShowCalendarList(true)}
        />
      </View>

      {showTimePicker && timePickerByPlatform}

      {calendarWidth > 0 && showCalendarList && (
        <ComponentsLayout style={styles.calendarLayout}>
          <CalendarList
            pastScrollRange={3}
            futureScrollRange={0}
            showScrollIndicator={true}
            horizontal={true}
            calendarWidth={255}
            maxDate={maxDate}
            onDayPress={handleDayPress}
            firstDay={1}
            theme={{ calendarBackground: "transparent" }}
            markedDates={{
              [selectedDay]: {
                selected: true,
                selectedColor: "rgba(126,76,215,.75)",
              },
            }}
          />
        </ComponentsLayout>
      )}
      <SelectCategories
        title="Select category of transanction"
        categoriesList={transactionType}
      />
      <CustomButton
        title={"Add transaction"}
        theme="primary"
        onPress={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
};

export default TransactionAdd;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  titleByDate: {
    fontSize: 14,
    fontFamily: "Quicksand_700Bold",
    marginTop: 10,
  },
  expireDateButton: {
    width: "49%",
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.5)",
    marginTop: 5,
    marginBottom: 10,
  },
  calendarLayout: {
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 320,
    width: 250,
    position: "absolute",
    right: 5,
    top: 85,
    zIndex: 999,
  },
  timePickerLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    position: "absolute",
    width: "50%",
    left: 5,
    top: 85,
    zIndex: 999,
  },
  timePickerButton: {
    width: "100%",
    paddingVertical: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  transactionView: {
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
});
