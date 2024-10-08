import { colors } from "./colors";

export const darkTheme = {
  type: "dark",
  background: "rgb(13, 15, 17)",
  componentsBackground: "rgb(30, 24, 40)",
  text: colors.neutral.neutral300,
  subText: colors.white.white500,
  button: {
    none: {
      background: colors.purple.purple1000,
      text: colors.neutral.neutral200,
      border: colors.none,
    },
    primary: {
      background: colors.purple.purple700,
      text: colors.grey.grey300,
      border: colors.none,
    },
    secondary: {
      background: colors.neutral.neutral700,
      text: colors.neutral.neutral200,
      border: colors.none,
    },
    transparent: {
      background: colors.none,
      text: colors.neutral.neutral200,
      border: colors.none,
    },
  },
  shadow: colors.white.white500,
  neutral: colors.white.white500,
  purple: colors.purple.purple700,
  red: colors.red.red800,
  green: colors.green.green700,
  blue: colors.blue.blue700,
  orange: colors.orange.orange700,
  svg: colors.white.white800,
  border: colors.white.white500,
  navbar: {
    active: colors.purple.purple1000,
    inactive: "rgb(60, 45, 75)",
  },
  calendar: {
    active: colors.neutral.neutral200,
    inactive: colors.neutral.neutral900,
  },
  colors: colors,
};
