import * as yup from "yup";
import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { FC, useCallback, useMemo, useState } from "react";
import { ITransactionAdd } from "./types";
import { useDispatch, useSelector } from "react-redux";
import setUserBalance from "../../api/firebase/user/userBalance/setUserBalance";
import {
  ISelectCategories,
  IUserBalance,
  ModalCloserActionType,
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
  transactionType: string;
}

const TransactionAdd: FC<ITransactionType> = ({ transactionType }) => {
  const init: ITransactionAdd = {
    transactionTitle: "",
    transactionValue: "",
    transactionTime: "",
    transactionDate: "",
    selectedCategories: "",
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

  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [currentTime, setCurrentTime] = useState(new Date());

  const onLayout = useCallback((e: any) => {
    const { width } = e.nativeEvent.layout;
    setCalendarWidth(width);
  }, []);
  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
    setShowCalendarList(false);
  }, []);

  const handleTimePress = useCallback(
    (event: DateTimePickerEvent, time: any) => {
      setCurrentTime(time);
    },
    []
  );
  const handleConfirmTime = () => {
    setShowTimePicker(false);
    const formattedTime = format(currentTime, "HH:mm");
    setSelectedTime(formattedTime);
  };

  const maxDate = format(today, "yyyy-MM-dd");
  const formattedDate = format(selectedDay, "dd MMMM yyyy");

  const onSubmitHandler = async (values: ITransactionAdd) => {};
  const checkUpForm = yup.object({
    transactionTitle: yup.string().required("Field should not be empty"),
    transactionValue: yup
      .number()
      .positive("Value can not be less than 0")
      .required("Field should not be empty"),
    transactionTime: yup.string().required("Field should not be empty"),
    transactionDate: yup.string().required("Field should not be empty"),
  });
  const formik = useFormik({
    initialValues: init,
    onSubmit: onSubmitHandler,
    validationSchema: checkUpForm,
  });
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleReset,
    setFieldValue,
  } = formik;
  const iconsIncomeList = useMemo(
    () => [
      { item: <SelectCategoriesSVG id={"Salary"} />, id: "Salary" },
      {
        item: <SelectCategoriesSVG id={"Social payment"} />,
        id: "Social payment",
      },
      { item: <SelectCategoriesSVG id={""} />, id: "Other" },
    ],
    []
  );
  const iconsOutcomeList = useMemo(
    () => [
      { item: <SelectCategoriesSVG id={"Transport"} />, id: "Transport" },
      { item: <SelectCategoriesSVG id={"Shopping"} />, id: "Shopping" },
      { item: <SelectCategoriesSVG id={"Travels"} />, id: "Travels" },
      {
        item: <SelectCategoriesSVG id={"Renovation"} />,
        id: "Renovation",
      },
      { item: <SelectCategoriesSVG id={"Holidays"} />, id: "Holidays" },
      {
        item: <SelectCategoriesSVG id={"Entertainment"} />,
        id: "Entertainment",
      },
      { item: <SelectCategoriesSVG id={"Other"} />, id: "Other" },
    ],
    []
  );

  const timePickerByPlatform =
    Platform.OS === "ios" ? (
      <ComponentsLayout style={styles.timePickerLayout}>
        <View style={{ alignItems: "center" }}>
          <DateTimePicker
            themeVariant="light"
            mode="time"
            value={currentTime}
            onChange={handleTimePress}
            display="spinner"
            style={{
              width: "100%",
            }}
          />
          <CustomButton
            title="Confirm"
            onPress={handleConfirmTime}
            style={{
              width: "100%",
              paddingVertical: 10,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
            theme="primary"
          />
        </View>
      </ComponentsLayout>
    ) : (
      <DateTimePicker
        mode="time"
        value={currentTime}
        onChange={handleTimePress}
        display="spinner"
        negativeButton={{ label: "Cancel" }}
      />
    );

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

      {transactionType === "Income transaction" ? (
        <SelectCategories
          title="Select category of transanction"
          icons={iconsIncomeList}
        />
      ) : (
        <SelectCategories
          title="Select category of transaction"
          icons={iconsOutcomeList}
        />
      )}
      <CustomButton title={"Add goal"} theme="primary" onPress={handleSubmit} />
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
  transactionView: {
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
});
