import { IModalCloser, ModalCloserActionType } from "./types";

const initState: IModalCloser = {
  isModalClose: false,
};
export const ModalCloserReducer = (
  state = initState,
  action: any
): IModalCloser => {
  switch (action.type) {
    case ModalCloserActionType.MODAL_CLOSE: {
      return {
        ...state,
        isModalClose: action.payload,
      };
    }
    default:
      return state;
  }
};
