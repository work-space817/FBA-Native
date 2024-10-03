export const ScreenNames = {
  IntroductionScreen: "IntroductionScreen",
  RegisterScreen: "RegisterScreen",
  LoginScreen: "LoginScreen",
  AuthenticationScreen: "AuthenticationScreen",
  HomeScreen: "HomeScreen",
  TransactionScreen: "TransactionScreen",
  StatisticScreen: "StatisticScreen",
  GoalScreen: "GoalScreen",
  SettingsScreen: "SettingsScreen",
} as const;

export const TabNames = {
  TabName: "MainTabs",
  Tabs: {
    HomeScreen: ScreenNames.HomeScreen,
    TransactionScreen: ScreenNames.TransactionScreen,
    StatisticScreen: ScreenNames.StatisticScreen,
    GoalScreen: ScreenNames.GoalScreen,
  },
} as const;
