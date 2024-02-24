import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { IGoalAdd } from "./types";
import React, { useCallback, useMemo, useState } from "react";
import {
  GoalListActionType,
  ISelectCategories,
  ModalCloserActionType,
} from "../../store/reducers/types";
import { View } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/SelectCategories";
import { format } from "date-fns";
import { CalendarList } from "react-native-calendars";
import setGoalsData from "../../api/firebase/goals/setGoalsData";
import { RootState } from "../../store";

const GoalAdd = () => {
  const init: IGoalAdd = {
    title: "",
    cost: "",
  };
  const { selectedCategories } = useSelector(
    (store: RootState) => store.selectCategories as ISelectCategories
  );
  const dispatch = useDispatch();
  const today = new Date();

  const [calendarWidth, setCalendarWidth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<any>(today);

  const onLayout = useCallback((e: any) => {
    const { width } = e.nativeEvent.layout;
    setCalendarWidth(width);
  }, []);
  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
  }, []);
  const minDate = format(today, "yyyy-MM-dd");
  const expireDate = format(selectedDay, "yyyy-MM-dd");

  const onSubmitHandler = async (values: IGoalAdd) => {
    try {
      const data = {
        ...values,
        cost: +values.cost,
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
    dispatch({
      type: ModalCloserActionType.MODAL_CLOSE,
      payload: false,
    });
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

  return (
    <View onLayout={onLayout}>
      {calendarWidth > 0 && (
        <View style={{ height: 320 }}>
          <CalendarList
            pastScrollRange={0}
            futureScrollRange={6}
            showScrollIndicator={true}
            horizontal={true}
            calendarWidth={calendarWidth}
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
        </View>
      )}
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
        onFocus={handleFocus}
        keyboardType="number-pad"
        value={values.cost}
        onChange={handleChange("cost")}
        clientSideError={errors.cost}
        touched={touched.cost}
      />
      <SelectCategories title="Select category of goal" icons={iconsList} />
      <CustomButton title={"Add goal"} theme="primary" onPress={handleSubmit} />
    </View>
  );
};

export default GoalAdd;
