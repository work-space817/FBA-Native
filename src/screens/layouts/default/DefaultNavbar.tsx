import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import NavbarSVG from "../../../helpers/SVG/layoutComponents/NavbarSVG";
import { useRoute } from "@react-navigation/native";

const DefaultNavbar = ({ navigation }: any) => {
  const route = useRoute();
  const currentRouteName = route.name;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === "HomeScreen" && styles.sidebarItemActive,
        ]}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <View>
          <NavbarSVG id="Overview" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === "TransactionScreen" && styles.sidebarItemActive,
        ]}
        onPress={() => navigation.navigate("TransactionScreen")}
      >
        <View>
          <NavbarSVG id="Transactions" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === "StatisticScreen" && styles.sidebarItemActive,
        ]}
        onPress={() => navigation.navigate("StatisticScreen")}
      >
        <View>
          <NavbarSVG id="Statistic" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === "SettingsScreen" && styles.sidebarItemActive,
        ]}
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
    // paddingBottom: 25,
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
  sidebarItemActive: {
    backgroundColor: "rgba(119, 36, 197, 0.324)",
  },
});

export default DefaultNavbar;
