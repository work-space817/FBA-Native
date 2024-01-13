import { StyleSheet, Text } from "react-native";
import AndroidFont from "./src/helpers/functions/AndroidFont";
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  const fontsLoaded = AndroidFont();
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
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
