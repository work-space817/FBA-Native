import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import IntroductionScreen from "../screens/auth/introduction/IntroductionScreen";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";
import DefaultHeader from "../layouts/default/DefaultHeader";
import { ScreenNames } from "./routes";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

type ScreenNamesType = keyof typeof ScreenNames;
export type RootStackParamList = Record<ScreenNamesType[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
        }}
      >
        <Stack.Group
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen
            name={ScreenNames.IntroductionScreen}
            component={IntroductionScreen}
          />
          <Stack.Screen
            name={ScreenNames.RegisterScreen}
            component={RegisterScreen}
          />
          <Stack.Screen
            name={ScreenNames.LoginScreen}
            component={LoginScreen}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigation}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            header: () => <DefaultHeader />,
          }}
        >
          <Stack.Screen
            name={ScreenNames.SettingsScreen}
            component={SettingsScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
