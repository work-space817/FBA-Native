import { IScrollViewPosition, ScrollViewPositionActionType } from "./types";

const initState: IScrollViewPosition = {
  keyboardAwarePosition: 75,
};
export const ScrollViewPositionReducer = (
  state = initState,
  action: any
): IScrollViewPosition => {
  switch (action.type) {
    case ScrollViewPositionActionType.SET_POSITION: {
      return {
        ...state,
        keyboardAwarePosition: action.payload,
      };
    }
    default:
      return state;
  }
};
