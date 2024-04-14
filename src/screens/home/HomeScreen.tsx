import DefaultLayout from "../layouts/default/DefaultLayout";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigation } from "../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import OperationMenu from "../../components/common/OperationMenu";
import Card from "../../components/card/Card";
import { BackHandler } from "react-native";
import GoalSlider from "../../components/goals/GoalSlider";
import { useDispatch } from "react-redux";
import GoalPieDiagram from "../../components/diagrams/goalDiagrams/goalPieDiagram/GoalPieDiagram";
import ExchangeRateLinear from "../../components/diagrams/exchangeRate/ExchangeRateLinear";
import { GoalListActionType } from "../../store/reducers/goalReducers/types";
import { UserBalanceActionType } from "../../store/reducers/userReducers/types";

export default function HomeScreen({ navigation }: any) {
  const { navigate } = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const checkUpUser = async () => {
    const uid = await AsyncStorage.getItem("uid");
    console.log(uid);
    if (uid === null) {
      navigate("AuthenticationScreen");
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
    });
    console.log("Refreshing components...");
  };

  return (
    <DefaultLayout
      navigation={navigation}
      onRefreshComponents={onRefreshComponents}
    >
      <OperationMenu />
      <GoalSlider />
      <Card />
      {/* <ExchangeRateLinear /> */}
      <GoalPieDiagram />
    </DefaultLayout>
  );
}
