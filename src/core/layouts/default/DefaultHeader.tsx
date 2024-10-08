import { useRoute, useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
import { StackNavigation } from "../../navigation/Navigation";
import { memo } from "react";
import { StatusBar } from "expo-status-bar";
import { ScreenNames } from "../../navigation/routes";
import { useTheme } from "../../themes/useTheme";

const theme = useTheme();

const DefaultHeader = memo(() => {
  const route = useRoute();
  const currentRouteName = route.name.replace("Screen", "");
  const { navigate } = useNavigation<StackNavigation>();
  const handleOnNavigate = () => {
    navigate(ScreenNames.SettingsScreen);
  };

  const statusBarOption = theme.type === "light" ? "dark" : "light";

  return (
    <View style={styles.layout}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <HeaderSVG id={"Cloud"} />
          <Text style={styles.headerTitleText}>{currentRouteName}</Text>
        </View>
        <TouchableOpacity onPress={handleOnNavigate}>
          <HeaderSVG id={"Settings"} height={44} width={44} />
        </TouchableOpacity>
      </View>
      <StatusBar animated={true} style={statusBarOption} />
      <Text style={styles.headerOptionalText}>
        Get summary of your weekly online transactions here.
      </Text>
    </View>
  );
});
const styles = StyleSheet.create({
  layout: {
    paddingTop: 40,
    backgroundColor: theme.background,
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
    color: theme.text,
  },
  headerOptionalText: {
    // paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: "Quicksand_600SemiBold",
    marginBottom: 15,
    color: theme.subText,
  },
});
export default DefaultHeader;
