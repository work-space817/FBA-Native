import AndroidFont from "./src/helpers/functions/AndroidFont";
import Navigation from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  const fontsLoaded = AndroidFont();
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
