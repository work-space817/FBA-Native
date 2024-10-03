import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import DefaultHeader from "../layouts/default/DefaultHeader";
import GoalScreen from "../screens/goal/GoalScreen";
import HomeScreen from "../screens/home/HomeScreen";
import StatisticScreen from "../screens/statistic/StatisticScreen";
import TransactionScreen from "../screens/transaction/TransactionScreen";
import { TabNames, ScreenNames } from "./routes";
import NavbarSVG from "../../helpers/SVG/layoutComponents/NavbarSVG";

const Tab = createBottomTabNavigator();

type MainTabsType = keyof typeof TabNames;
export type RootTabsParamList = Record<
  MainTabsType[number],
  string | undefined
>;

export type TabsNavigation = NavigationProp<RootTabsParamList>;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <DefaultHeader />,
        tabBarActiveBackgroundColor: "rgba(119, 36, 197, 0.324)",
        tabBarInactiveBackgroundColor: "#f5f5f5",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderColor: "white",
          borderRightWidth: 1,
          borderStyle: "solid",
        },
      }}
    >
      <Tab.Screen
        name={ScreenNames.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <NavbarSVG id="Home" />,
        }}
      />
      <Tab.Screen
        name={ScreenNames.TransactionScreen}
        component={TransactionScreen}
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: () => <NavbarSVG id="Transactions" />,
        }}
      />
      <Tab.Screen
        name={ScreenNames.StatisticScreen}
        component={StatisticScreen}
        options={{
          tabBarLabel: "Statistic",
          tabBarIcon: () => <NavbarSVG id="Statistic" />,
        }}
      />
      <Tab.Screen
        name={ScreenNames.GoalScreen}
        component={GoalScreen}
        options={{
          tabBarLabel: "Goals",
          tabBarIcon: () => <NavbarSVG id="Goals" />,
          tabBarBadge: 5,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
