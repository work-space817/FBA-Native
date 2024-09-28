import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";
import { StackNavigation } from "../../navigation/Navigation";
import { memo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScreenNames } from "../../navigation/routes";

const DefaultHeader = memo(() => {
  const dispatch = useDispatch();
  const route = useRoute();
  const currentRouteName = route.name.replace("Screen", "");
  const { navigate } = useNavigation<StackNavigation>();
  const handleOnNavigate = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("uid");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigate(ScreenNames.IntroductionScreen);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <HeaderSVG id={"Cloud"} />
          <Text style={styles.headerTitleText}>{currentRouteName}</Text>
        </View>
        <TouchableOpacity onPress={handleOnNavigate}>
          <HeaderSVG id={"LogOut"} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <Text style={styles.headerOptionalText}>
        Get summary of your weekly online transactions here.
      </Text>
    </View>
  );
});
const styles = StyleSheet.create({
  layout: {
    paddingTop: 40,
    backgroundColor: "rgba(140,0,255,.1)",
    paddingHorizontal: 16,
  },
  headerCloudImage: {
    width: 50,
    height: 50,
  },
  headerLogOutImage: {
    width: 35,
    height: 35,
  },
  headerContainer: {
    // paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitleText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 22,
  },
  headerOptionalText: {
    // paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: "Quicksand_600SemiBold",
    color: "rgba(0,0,0,0.5)",
    marginBottom: 15,
  },
});
export default DefaultHeader;
