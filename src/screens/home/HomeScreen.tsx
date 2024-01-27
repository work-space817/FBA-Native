import { Text, View } from "react-native";
import DefaultLayout from "../layouts/default/DefaultLayout";
import { auth } from "../../api/firebase/config";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigation } from "../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import OperationMenu from "../../components/common/OperationMenu";
import Card from "../../components/card/Card";
import { BackHandler } from "react-native";
import GoalSlider from "../../components/goals/GoalSlider";
export default function HomeScreen({ navigation }: any) {
  const { navigate } = useNavigation<StackNavigation>();
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

  return (
    <DefaultLayout navigation={navigation}>
      <View>
        <OperationMenu />
        <GoalSlider />
        <Card />
      </View>
    </DefaultLayout>
  );
}
