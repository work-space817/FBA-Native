import { ScrollEnableActionType, ScrollEnable } from "../types";

const initState: ScrollEnable = {
  parentsScrolling: false,
  childrenScrolling: false,
};
export const ScrollEnableReducer = (
  state = initState,
  action: any
): ScrollEnable => {
  switch (action.type) {
    case ScrollEnableActionType.PARENTS_SCROLLING_TRUE:
      return { ...state, parentsScrolling: true, childrenScrolling: false };
    case ScrollEnableActionType.CHILDREN_SCROLLING_TRUE:
      return { ...state, parentsScrolling: false, childrenScrolling: true };
    default:
      return state;
  }
};
