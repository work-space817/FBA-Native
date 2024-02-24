import * as yup from "yup";
import { useFormik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { updateDoc, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import getGoalsData from "../../api/firebase/goals/getGoalsData";
import {
  IGoalSelect,
  GoalListActionType,
  GoalSelectActionType,
} from "../../store/reducers/types";
import { IGoalEdit } from "./types";
import Goal from "./Goal";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import { RootState } from "../../store";
import { CalendarList } from "react-native-calendars";
import { format } from "date-fns";

const GoalEdit = memo(() => {
  const dispatch = useDispatch();
  const { selectedGoal } = useSelector(
    (store: RootState) => store.selectGoal as IGoalSelect
  );
  const [showCalendarList, setShowCalendarList] = useState(false);
  const init: IGoalEdit = {
    title: "",
    cost: "0",
    expireDate: "",
  };
  const goalDoneDelete = async () => {
    try {
      const fetchGoals = await getGoalsData();
      const fetchCurrentGoal = fetchGoals.docs.map((doc) =>
        doc.id === selectedGoal?.id ? deleteDoc(doc.ref) : null
      );
      const updateGoalList = dispatch({
        type: GoalListActionType.UPDATE_GOALS_LIST,
      });
      dispatch({
        type: GoalSelectActionType.GOAL_SELECT,
        selectedGoal: null,
      });
    } catch (error) {
      console.error("Сталася помилка при видаленні цілі:", error);
    }
  };

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<any>(today);
  const handleDayPress = useCallback((day: any) => {
    setSelectedDay(day.dateString);
    setShowCalendarList(false);
  }, []);

  const minDate = format(today, "yyyy-MM-dd");
  const expireDate = format(selectedDay, "yyyy-MM-dd");
  const formattedDate = format(expireDate, "dd.MM.yyyy");

  const onSubmitHandler = async (values: any) => {
    try {
      const fetchGoals = await getGoalsData();
      const data = {
        ...values,
        expireDate: expireDate,
      };
      console.log(data);
      const fetchCurrentGoal = fetchGoals.docs.map((doc) =>
        doc.id === selectedGoal?.id ? updateDoc(doc.ref, data) : null
      );
      handleReset(values);
      const updateGoalList = dispatch({
        type: GoalListActionType.UPDATE_GOALS_LIST,
      });
      dispatch({
        type: GoalSelectActionType.GOAL_SELECT,
        selectedGoal: null,
      });
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
  const handleFocus = useCallback(() => {
    setFieldValue("cost", "");
  }, [setFieldValue]);
  return (
    <ComponentsLayout>
      <Text style={[styles.titleText]}>Select above to edit</Text>
      <View style={styles.layout}>
        <View style={styles.goalLayout}>
          {selectedGoal != null ? (
            <Goal
              id={selectedGoal.id}
              cost={selectedGoal.cost}
              expireDate={selectedGoal.expireDate}
              title={selectedGoal.title}
              selectedCategories={selectedGoal.selectedCategories}
            />
          ) : (
            <Goal
              id={""}
              cost={0}
              expireDate={minDate}
              title={"Your title"}
              selectedCategories={<SelectCategoriesSVG id={""} />}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <CustomButton
              style={{ borderRadius: 12, padding: 5 }}
              title={"Delete this goal"}
              theme={!selectedGoal ? "none" : "primary"}
              disabled={!selectedGoal}
              onPress={goalDoneDelete}
            />
          </View>
        </View>
        <View style={styles.formLayout}>
          <CustomInput
            label="Change your title"
            field="title"
            value={values.title}
            onChange={handleChange("title")}
            clientSideError={errors.title}
            touched={touched.title}
            disabled={!selectedGoal}
          />
          <CustomInput
            label="Change goals' cost"
            field="cost"
            inputMode="numeric"
            defaultValue=""
            keyboardType="number-pad"
            value={values.cost}
            onChange={handleChange("cost")}
            onFocus={handleFocus}
            clientSideError={errors.cost}
            touched={touched.cost}
            disabled={!selectedGoal}
          />
          <CustomButton
            style={styles.expireDateButton}
            title={selectedGoal ? formattedDate : "Change expire date"}
            theme="none"
            disabled={!selectedGoal}
            onPress={() => setShowCalendarList(true)}
          />
          {showCalendarList && (
            <ComponentsLayout style={styles.calendarLayout}>
              <CalendarList
                pastScrollRange={0}
                futureScrollRange={6}
                showScrollIndicator={true}
                horizontal={true}
                calendarWidth={240}
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
          <CustomButton
            title={"Update goal"}
            theme={!selectedGoal ? "none" : "primary"}
            onPress={handleSubmit}
            disabled={!selectedGoal}
          />
        </View>
      </View>
    </ComponentsLayout>
  );
});

export default GoalEdit;

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
  layout: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  goalLayout: {
    width: "40%",
    alignItems: "center",
  },
  formLayout: {
    alignItems: "flex-end",
    marginTop: 0,
    width: "55%",
  },
  calendarLayout: {
    height: 320,
    width: 250,
    position: "absolute",
    left: -45,
    top: -185,
    zIndex: 999,
  },
});
