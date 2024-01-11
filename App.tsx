import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DefaultHeader from "./src/screens/layouts/default/DefaultHeader";
import DefaultNavbar from "./src/screens/layouts/default/DefaultNavbar";
import HomeScreen from "./src/screens/home/HomeScreen";
import AndroidFont from "./src/helpers/functions/AndroidFont";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  const fontsLoaded = AndroidFont();
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  outterLayout: {
    height: "100%",
    justifyContent: "space-between",
  },
  innerLayout: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
