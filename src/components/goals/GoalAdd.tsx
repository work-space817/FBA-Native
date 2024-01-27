import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { IGoalAdd } from "./types";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  GoalListActionType,
  ISelectCategories,
  ModalCloserActionType,
} from "../../store/reducers/types";
import { View, StyleSheet, Text } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/SelectCategories";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import setGoalsData from "../../api/firebase/goals/setGoalsData";

const GoalAdd = () => {
  const init: IGoalAdd = {
    title: "",
    cost: "0",
  };
  const { selectedCategories } = useSelector(
    (store: any) => store.selectCategories as ISelectCategories
  );
  console.log(selectedCategories);
  const dispatch = useDispatch();
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  const [selectedDay, setSelectedDay] = useState<any>(today);
  const expireDate = format(selectedDay, "dd.MM.yyyy");
  const onSubmitHandler = async (values: IGoalAdd) => {
    try {
      const data = {
        ...values,
        selectedCategories,
        expireDate,
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

  const iconsList = useMemo(
    () => [
      { id: "Transport" },
      { id: "Shopping" },
      { id: "Travels" },
      { id: "Renovation" },
      { id: "Holidays" },
      { id: "Entertainment" },
      { id: "Other" },
    ],
    []
  );

  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        minDate={formattedDate}
        onDayPress={handleDayPress}
        firstDay={1}
        markedDates={{
          [selectedDay]: {
            selected: true,
            marked: true,
            selectedColor: "blue",
          },
        }}
      />
      <CustomInput
        label="Enter your title"
        field="title"
        value={values.title}
        keyboardType="email-address"
        onChange={handleChange("title")}
        //   clientSideError={errors.email}
        touched={touched.title}
      />
      <CustomInput
        label="Enter goals' cost"
        field="cost"
        inputMode="numeric"
        keyboardType="number-pad"
        value={values.cost}
        onChange={handleChange("cost")}
        onFocus={() => setFieldValue("cost", "")}
        //   clientSideError={errors.currentBalance}
        touched={touched.cost}
      />
      <SelectCategories title="Select category of goal" icons={iconsList} />
      <CustomButton title={"Add goal"} theme="primary" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // paddingTop: 25,
    // paddingBottom: 25,
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 10,
    // borderStyle: "solid",
  },
});
export default GoalAdd;
