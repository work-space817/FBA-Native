import { IGoal } from "../../../components/goals/types";

export interface IGoalList {
  goalList: IGoal[];
  isUpdatedGoaliList: boolean;
}
export enum GoalListActionType {
  GOAL_LIST = "GOAL_LIST",
  UPDATE_GOALS_LIST = "UPDATE_GOALS_LIST",
}
export interface IGoalSelect {
  selectedGoal: IGoal | null;
}
export enum GoalSelectActionType {
  GOAL_SELECT = "GOAL_SELECT",
}
