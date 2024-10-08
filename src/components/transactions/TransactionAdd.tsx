import * as yup from "yup";
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useCallback, useState } from "react";
import { ITransactionAdd } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import setTransactionData from "../../api/firebase/transactions/setTransactionData";
import { CalendarList } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/category/SelectCategories";
import { format } from "date-fns";
import Transaction from "./Transaction";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import updateUserInformation from "../../api/firebase/user/userInfo/updateUserInformation";
import { RootState } from "../../store";
import { UserBalanceActionType } from "../../store/reducers/userReducers/types";
import {
  ModalCloserActionType,
  SelectCategoriesActionType,
} from "../../store/reducers/common/types";
import { TransactionListActionType } from "../../store/reducers/transactionReducers/types";
import { Categories } from "../common/category/types";
import { useTheme } from "../../core/themes/useTheme";

interface ITransactionType {
  transactionType: Categories;
}

const theme = useTheme();

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
    (store: RootState) => store.selectCategories
  );
  const { userBalance } = useSelector((store: RootState) => store.userBalance);
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
      const transactionData = {
        ...values,
        transactionValue: Number(values.transactionValue),
        transactionTime: selectedTime,
        transactionDate: transactionDate,
        selectedCategories: selectedCategories,
      };
      if (values.transactionType === Categories.incomeTransaction) {
        updateUserInformation({
          currentBalance: userBalance + Number(values.transactionValue),
        });
      } else if (values.transactionType === Categories.outcomeTransaction) {
        updateUserInformation({
          currentBalance: userBalance - Number(values.transactionValue),
        });
      }
      setTransactionData(transactionData);
      console.log("Нова транзакція успішно створена: ", transactionData);
      dispatch({
        type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
      });
      dispatch({
        type: UserBalanceActionType.UPDATE_BALANCE,
      });
      dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: true,
      });
      dispatch({
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
      <Text style={[styles.text, styles.titleText]}>Future transaction</Text>

      <View style={{ alignItems: "center" }}>
        <Text style={[styles.text, styles.titleByDate]}>{formattedDate}</Text>

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
        onChangeText={handleChange("transactionTitle")}
        clientSideError={errors.transactionTitle}
        touched={touched.transactionTitle}
      />
      <CustomInput
        label="Enter transactions' cost"
        field="transactionValue"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.transactionValue}
        onChangeText={handleChange("transactionValue")}
        clientSideError={errors.transactionValue}
        touched={touched.transactionValue}
      />

      <Text style={styles.label}>Select transaction time and date</Text>

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
            theme={{
              calendarBackground: "transparent",
              dayTextColor: theme.calendar.active,
              textDisabledColor: theme.calendar.inactive,
              todayTextColor: theme.purple,
              monthTextColor: theme.text,
            }}
            markedDates={{
              [selectedDay]: {
                selected: true,
                selectedColor: theme.purple,
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
  label: {
    color: theme.text,
    marginBottom: 5,
    marginTop: 0,
  },
  text: {
    color: theme.text,
  },
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
    borderColor: theme.border,
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
