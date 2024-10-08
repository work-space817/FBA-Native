import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { IGoalAdd } from "./types";
import React, { memo, useCallback, useMemo, useState } from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/category/SelectCategories";
import { format } from "date-fns";
import { CalendarList, DateData } from "react-native-calendars";
import setGoalsData from "../../api/firebase/goals/setGoalsData";
import { RootState } from "../../store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";
import Goal from "./Goal";
import {
  ModalCloserActionType,
  SelectCategoriesActionType,
} from "../../store/reducers/common/types";
import { GoalListActionType } from "../../store/reducers/goalReducers/types";
import { Categories } from "../common/category/types";
import { useTheme } from "../../core/themes/useTheme";

const theme = useTheme();

const GoalAdd = memo(() => {
  const init: IGoalAdd = {
    title: "",
    cost: "",
    expireDate: "",
    selectedCategories: "",
  };
  const { selectedCategories } = useSelector(
    (store: RootState) => store.selectCategories
  );

  const dispatch = useDispatch();
  const today = new Date();

  const [calendarWidth, setCalendarWidth] = useState(0);
  const [showCalendarList, setShowCalendarList] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(today);

  const minDate = format(today, "yyyy-MM-dd");
  const expireDate = format(selectedDay, "yyyy-MM-dd");
  const formattedDate = format(expireDate, "dd MMMM yyyy");

  const onLayout = useCallback((e: any) => {
    const { width } = e.nativeEvent.layout;
    setCalendarWidth(width);
  }, []);
  const handleDayPress = useCallback((day: DateData) => {
    setSelectedDay(day.dateString);
    setShowCalendarList(false);
  }, []);
  const goalPosition: ViewStyle = showCalendarList
    ? { alignItems: "flex-start" }
    : { alignItems: "center" };

  const onSubmitHandler = async (values: IGoalAdd) => {
    try {
      const data = {
        ...values,
        cost: Number(values.cost),
        expireDate: expireDate,
        selectedCategories: selectedCategories,
      };
      console.log(data);
      setGoalsData(data);
      handleReset(values);
      dispatch({
        type: GoalListActionType.UPDATE_GOALS_LIST,
      });
      dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: true,
      });
      dispatch({
        type: SelectCategoriesActionType.SELECT_CATEGORIES,
        payload: null,
      });
      console.log("New goal was created");
    } catch (error: any) {
      console.log("Bad request", error);
    } finally {
      dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: true,
      });
    }
  };

  const checkUpForm = yup.object({
    title: yup.string().required("Field should not be empty"),
    cost: yup
      .number()
      .positive("Value can not be less than 0")
      .required("Field should not be empty"),
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

  const handleFocus = useCallback(() => {
    setFieldValue("cost", "");
  }, [setFieldValue]);

  return (
    <KeyboardAwareScrollView
      extraHeight={100}
      keyboardDismissMode="on-drag"
      enableOnAndroid={true}
      keyboardOpeningTime={0}
      onLayout={onLayout}
    >
      <Text style={styles.titleText}>Future goal</Text>
      <View style={goalPosition}>
        <Goal
          style={[{ marginHorizontal: 3 }]}
          title={values.title.length > 0 ? values.title : "Future title"}
          cost={+values.cost}
          expireDate={expireDate}
          selectedCategories={selectedCategories}
          id={""}
        />
      </View>

      <CustomInput
        label="Enter your title"
        field="title"
        value={values.title}
        keyboardType="email-address"
        onChangeText={handleChange("title")}
        clientSideError={errors.title}
        touched={touched.title}
      />
      <CustomInput
        label="Enter goals' cost"
        field="cost"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.cost}
        onChangeText={handleChange("cost")}
        onFocus={handleFocus}
        clientSideError={errors.cost}
        touched={touched.cost}
      />

      <CustomButton
        label="Select expire date"
        style={styles.expireDateButton}
        title={formattedDate}
        theme="none"
        onPress={() => setShowCalendarList(true)}
      />
      {calendarWidth > 0 && showCalendarList && (
        <ComponentsLayout style={styles.calendarLayout}>
          <CalendarList
            pastScrollRange={0}
            futureScrollRange={6}
            showScrollIndicator={true}
            horizontal={true}
            calendarWidth={255}
            minDate={minDate}
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
        title="Select category of goal"
        categoriesList={Categories.allCategories}
      />
      <CustomButton title={"Add goal"} theme="primary" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
});

export default GoalAdd;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
    color: theme.text,
  },
  expireDateButton: {
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  calendarLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 320,
    width: 250,
    position: "absolute",
    left: 115,
    top: 10,
    zIndex: 999,
  },
});
