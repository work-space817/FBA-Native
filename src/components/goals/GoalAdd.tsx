import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { IGoalAdd } from "./types";
import React, { useCallback, useMemo, useState } from "react";
import {
  GoalListActionType,
  ModalCloserActionType,
} from "../../store/reducers/types";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/SelectCategories";
import { format } from "date-fns";
import { CalendarList } from "react-native-calendars";
import setGoalsData from "../../api/firebase/goals/setGoalsData";
import { RootState } from "../../store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import Goal from "./Goal";

const GoalAdd = () => {
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

  const onLayout = useCallback((e: any) => {
    const { width } = e.nativeEvent.layout;
    setCalendarWidth(width);
  }, []);
  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
    setShowCalendarList(false);
  }, []);
  const minDate = format(today, "yyyy-MM-dd");
  const expireDate = format(selectedDay, "yyyy-MM-dd");
  const formattedDate = format(expireDate, "dd MMMM yyyy");

  const onSubmitHandler = async (values: IGoalAdd) => {
    try {
      const data = {
        ...values,
        cost: +values.cost,
        expireDate: expireDate,
        selectedCategories: selectedCategories,
      };
      console.log(data);
      setGoalsData(data);
      handleReset(values);
      const updateGoalList = dispatch({
        type: GoalListActionType.UPDATE_GOALS_LIST,
      });
      const modalCloser = dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: true,
      });
      console.log("New goal was created");
    } catch (error: any) {
      console.log("Bad request", error);
    } finally {
      dispatch({
        type: ModalCloserActionType.MODAL_CLOSE,
        payload: false,
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
  const { values, touched, errors, handleSubmit, handleChange, handleReset } =
    formik;
  const iconsList = useMemo(
    () => [
      { id: "Transport" },
      { id: "Shopping" },
      { id: "Travels" },
      { id: "Entertainment" },
      { id: "Renovation" },
      { id: "Holidays" },
      { id: "Other" },
    ],
    []
  );

  const goalPosition: ViewStyle = showCalendarList
    ? { alignItems: "flex-start" }
    : { alignItems: "center" };
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
        onChange={handleChange("title")}
        clientSideError={errors.title}
        touched={touched.title}
      />
      <CustomInput
        label="Enter goals' cost"
        field="cost"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.cost}
        onChange={handleChange("cost")}
        clientSideError={errors.cost}
        touched={touched.cost}
      />

      <Text style={{ marginBottom: 5, marginTop: 0 }}>Select expire date</Text>
      <CustomButton
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
      <SelectCategories title="Select category of goal" icons={iconsList} />
      <CustomButton title={"Add goal"} theme="primary" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
};

export default GoalAdd;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  expireDateButton: {
    width: "100%",
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.5)",
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
