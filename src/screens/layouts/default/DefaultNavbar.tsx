import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import NavbarSVG from "../../../helpers/SVG/layoutComponents/NavbarSVG";

const DefaultNavbar = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <View>
          <NavbarSVG id="Overview" />
        </View>
      </TouchableOpacity>
      <View style={styles.sidebarItem}>
        <Text>
          <NavbarSVG id="Transactions" />
        </Text>
      </View>
      <View style={styles.sidebarItem}>
        <Text>
          <NavbarSVG id="Statistic" />
        </Text>
      </View>
      <TouchableOpacity
        style={styles.sidebarItem}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <View>
          <NavbarSVG id="Settings" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  sidebarItem: {
    padding: 2,
    borderRadius: 3,
    height: 55,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRightWidth: 1,
    borderStyle: "solid",
  },
});

export default DefaultNavbar;
