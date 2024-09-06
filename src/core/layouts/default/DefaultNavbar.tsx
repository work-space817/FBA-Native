import React, { memo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import NavbarSVG from "../../../helpers/SVG/layoutComponents/NavbarSVG";
import { StackNavigation } from "../../navigation/Navigation";
import { ScreenNames } from "../../navigation/routes";
import { useRoute, useNavigation } from "@react-navigation/native";

const DefaultNavbar = memo(() => {
  const route = useRoute();
  const currentRouteName = route.name;
  const { navigate } = useNavigation<StackNavigation>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === ScreenNames.HomeScreen &&
            styles.sidebarItemActive,
        ]}
        onPress={() => navigate(ScreenNames.HomeScreen)}
      >
        <View>
          <NavbarSVG id="Overview" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === ScreenNames.TransactionScreen &&
            styles.sidebarItemActive,
        ]}
        onPress={() => navigate(ScreenNames.TransactionScreen)}
      >
        <View>
          <NavbarSVG id="Transactions" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === ScreenNames.StatisticScreen &&
            styles.sidebarItemActive,
        ]}
        onPress={() => navigate(ScreenNames.StatisticScreen)}
      >
        <View>
          <NavbarSVG id="Statistic" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sidebarItem,
          currentRouteName === ScreenNames.SettingsScreen &&
            styles.sidebarItemActive,
        ]}
        onPress={() => navigate(ScreenNames.SettingsScreen)}
      >
        <View>
          <NavbarSVG id="Settings" />
        </View>
      </TouchableOpacity>
    </View>
  );
});

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
