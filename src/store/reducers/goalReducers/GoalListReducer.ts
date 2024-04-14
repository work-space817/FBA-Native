import { GoalListActionType, IGoalList } from "./types";

const initState: IGoalList = {
  isUpdatedGoaliList: false,
  goalList: [],
};

export const GoalListReducer = (state = initState, action: any): IGoalList => {
  switch (action.type) {
    case GoalListActionType.GOAL_LIST:
      return {
        ...state,
        isUpdatedGoaliList: false,
        goalList: action.payload,
      };
    case GoalListActionType.UPDATE_GOALS_LIST:
      return {
        ...state,
        isUpdatedGoaliList: true,
      };
    default:
      return state;
  }
};
