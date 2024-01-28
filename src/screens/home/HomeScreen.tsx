import DefaultLayout from "../layouts/default/DefaultLayout";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigation } from "../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import OperationMenu from "../../components/common/OperationMenu";
import Card from "../../components/card/Card";
import { BackHandler } from "react-native";
import GoalSlider from "../../components/goals/GoalSlider";
import GoalList from "../../components/goals/GoalList";
import { useDispatch } from "react-redux";
import {
  GoalListActionType,
  UserBalanceActionType,
} from "../../store/reducers/types";
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
    </DefaultLayout>
  );
}
