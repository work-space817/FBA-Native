import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";
import CustomButton from "../../../components/UI/CustomButton";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
import { StackNavigation } from "../../navigation/Navigation";
import { ScreenNames } from "../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { Alert, Appearance } from "react-native";

export default function SettingsScreen() {
  const onRefreshComponents = () => {
    console.log("Refreshing components...");
  };

  const dispatch = useDispatch();
  const { navigate } = useNavigation<StackNavigation>();
  const handleOnNavigate = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("uid");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigate(ScreenNames.IntroductionScreen);
  };

  const logOutAlert = () =>
    Alert.alert("Log out", "Do you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: handleOnNavigate },
    ]);

  return (
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <CustomButton onPress={logOutAlert}>
        <HeaderSVG id={"LogOut"} height={44} width={44} />
      </CustomButton>
    </DefaultScrollableLayout>
  );
}
