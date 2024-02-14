import { GoalSelectActionType, IGoalSelect } from "../types";

const initState: IGoalSelect = {
  selectedGoal: null,
};
export const SelectGoalReducer = (
  state = initState,
  action: any
): IGoalSelect => {
  switch (action.type) {
    case GoalSelectActionType.GOAL_SELECT: {
      return {
        ...state,
        selectedGoal: action.payload,
      };
    }
    default:
      return state;
  }
};
