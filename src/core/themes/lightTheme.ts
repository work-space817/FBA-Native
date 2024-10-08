import { colors } from "./colors";

export const lightTheme = {
  type: "light",
  background: "rgba(140,0,255,.1)",
  componentsBackground: "rgb(255,245,250)",
  text: colors.black.default,
  subText: colors.black.black500,
  button: {
    none: {
      background: colors.none,
      text: colors.black.default,
      border: colors.black.black200,
    },
    primary: {
      background: colors.purple.purple500,
      text: colors.white.default,
      border: colors.none,
    },
    secondary: {
      background: colors.grey.grey300,
      text: colors.white.default,
      border: colors.none,
    },
    transparent: {
      background: colors.none,
      text: colors.neutral.neutral200,
      border: colors.none,
    },
  },
  shadow: colors.black.default,
  neutral: colors.black.black500,
  purple: colors.purple.purple500,
  red: colors.red.red500,
  green: colors.green.green500,
  blue: colors.blue.blue400,
  orange: colors.orange.orange400,
  svg: colors.black.default,
  border: colors.black.black800,
  navbar: {
    active: colors.purple.purple300,
    inactive: colors.purple.purple100,
  },
  calendar: {
    active: colors.neutral.neutral900,
    inactive: colors.neutral.neutral200,
  },
  colors: colors,
};
