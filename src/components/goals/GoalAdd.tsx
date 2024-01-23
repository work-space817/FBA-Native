import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { IGoalAdd } from "./types";
import React, { useCallback, useMemo, useState } from "react";
import setGoalsData from "../../api/firebase/goals/setGoalsData";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import {
  ISelectCategories,
  GoalListActionType,
} from "../../store/reducers/types";
import { View, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import SelectCategories from "../common/SelectCategories";

const GoalAdd = () => {
  const init: IGoalAdd = {
    title: "",
    cost: "0",
  };
  const { selectedCategories } = useSelector(
    (store: any) => store.selectCategories as ISelectCategories
  );
  const dispatch = useDispatch();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const expireDate = selectedDay?.toLocaleDateString();
  //   const footer = selectedDay ? (
  //     <p>You selected {format(selectedDay, "PPP")}.</p>
  //   ) : (
  //     <p>Please pick a day.</p>
  //   );

  const onSubmitHandler = async (values: IGoalAdd) => {
    try {
      //   const currentCategory = {
      //     ...values,
      //     selectedCategories,
      //     expireDate,
      //   };
      //   console.log(currentCategory);
      //   setGoalsData(currentCategory);
      //   handleReset(values);
      //   const updateGoalList = dispatch({
      //     type: GoalListActionType.UPDATE_GOALS_LIST,
      //   });
      //   const modalCloser = dispatch({
      //     type: ModalCloserActionType.MODAL_CLOSE,
      //     payload: true,
      //   });

      console.log("Нова ціль успішно створена.");
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
  const handleFocus = useCallback(() => {
    setFieldValue("cost", "");
  }, [setFieldValue]);
  return (
    <View style={styles.container}>
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
        onFocus={handleFocus}
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
    // paddingTop: 25,
    // paddingBottom: 25,
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 10,
    // borderStyle: "solid",
  },
});
export default GoalAdd;
