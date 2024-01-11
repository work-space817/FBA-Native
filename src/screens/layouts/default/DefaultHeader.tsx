import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import HeaderSVG from "../../../helpers/SVG/layoutComponents/HeaderSVG";
const DefaultHeader = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitle}>
          <HeaderSVG id={"Cloud"} />
          <Text style={styles.headerTitleText}>Overiew</Text>
        </View>
        <HeaderSVG id={"LogOut"} />
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
  },
});
export default DefaultHeader;
