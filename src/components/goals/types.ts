import { ViewStyle } from "react-native";

export interface IGoal {
  cost: number;
  expireDate: string;
  title: string;
  selectedCategories: string | React.ReactNode;
  id: string;
  style?: ViewStyle[];
}
export interface IGoalAdd {
  title: string;
  cost: number | string;
  expireDate: string;
  selectedCategories: string;
}

export interface IGoalEdit {
  title: string;
  cost: number | string;
  expireDate: string;
}
