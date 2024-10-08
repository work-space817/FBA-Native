import { Appearance } from "react-native";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

export const useTheme = (changeTheme?: string) => {
  const colorScheme = changeTheme || Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? lightTheme : darkTheme;

  console.log("theme: ", theme.type);

  return theme;
};
