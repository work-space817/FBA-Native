import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigation } from "../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import OperationMenu from "../../../components/common/UI/OperationMenu";
import { BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import ExchangeRateLinear from "../../../components/diagrams/exchangeRate/ExchangeRateLinear";
import { GoalListActionType } from "../../../store/reducers/goalReducers/types";
import { UserBalanceActionType } from "../../../store/reducers/userReducers/types";
import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";
import { ScreenNames } from "../../navigation/routes";
import Card from "../../../components/card/Card";

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const checkUpUser = async () => {
    const uid = await AsyncStorage.getItem("uid");
    if (uid === null) {
      navigate(ScreenNames.IntroductionScreen);
    }
  };
  useEffect(() => {
    checkUpUser();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const onRefreshComponents = () => {
    dispatch({
      type: GoalListActionType.UPDATE_GOALS_LIST,
    });
    dispatch({
      type: UserBalanceActionType.UPDATE_BALANCE,
      payload: true,
    });
    console.log("Refreshing components...");
  };

  return (
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <OperationMenu />
      <Card />
      <ExchangeRateLinear />
    </DefaultScrollableLayout>
  );
}
