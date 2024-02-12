import { IGoal } from "../../goals/types";
export interface IGoalByCategory {
  summaryGoalCategory: string | React.ReactNode;
  summaryGoalValue: number;
  summaryGoalCount: number;
  goals: IGoal[];
}
export interface IGoalCircleStatisticList {
  isExpire: boolean;
  summaryCount: number;
  goalsByCategory: IGoalByCategory[];
}
