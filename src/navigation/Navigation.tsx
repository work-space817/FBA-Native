import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
        <Stack.Screen name="StatisticScreen" component={StatisticScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
