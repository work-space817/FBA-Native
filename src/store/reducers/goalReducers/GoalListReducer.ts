import { IGoalList } from "../types";

const initState: IGoalList = {
  isUpdatedGoaliList: false,
  goalList: [],
};

export const GoalListReducer = (state = initState, action: any): IGoalList => {
  switch (action.type) {
    case "GOAL_LIST":
      return {
        ...state,
        isUpdatedGoaliList: false,
        goalList: action.payload,
      };
    case "UPDATE_GOALS_LIST":
      return {
        ...state,
        isUpdatedGoaliList: true,
      };
    default:
      return state;
  }
};
