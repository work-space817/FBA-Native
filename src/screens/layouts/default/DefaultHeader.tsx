import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigation } from "../../../navigation/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { AuthUserActionType } from "../../../store/reducers/userReducers/types";

const DefaultHeader = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const currentRouteName = route.name.replace("Screen", "");
  const { navigate } = useNavigation<StackNavigation>();
  const handleOnNavigate = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("uid");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigate("AuthenticationScreen");
  };

  return (
    <View>
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
};
const styles = StyleSheet.create({
  headerCloudImage: {
    width: 50,
    height: 50,
  },
  headerLogOutImage: {
    width: 35,
    height: 35,
  },
  headerContainer: {
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
    fontSize: 15,
    fontFamily: "Quicksand_600SemiBold",
    color: "rgba(0,0,0,0.5)",
    marginBottom: 15,
  },
});
export default DefaultHeader;
