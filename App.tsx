import { Provider } from "react-redux";
import { store } from "./src/store";
import Navigation from "./src/core/navigation/Navigation";
import androidFont from "./src/core/fonts/androidFont";

export default function App() {
  const fontsLoaded = androidFont();
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
