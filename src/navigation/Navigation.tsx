import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import HomeScreen from "../screens/home/HomeScreen";
import TransactionScreen from "../screens/transaction/TransactionScreen";
import StatisticScreen from "../screens/statistic/StatisticScreen";
import AuthenticationScreen from "../screens/auth/AuthenticationScreen";

const Stack = createNativeStackNavigator();
export type ScreenNames = [
  "AuthenticationScreen",
  "HomeScreen",
  "TransactionScreen",
  "StatisticScreen",
  "SettingsScreen"
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="StatisticScreen"
          component={StatisticScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
