import { ISelectCategories, SelectCategoriesActionType } from "./types";

const initState: ISelectCategories = {
  selectedCategories: "",
  isSelected: false,
};
export const SelectCategoriesReducer = (
  state = initState,
  action: any
): ISelectCategories => {
  switch (action.type) {
    case SelectCategoriesActionType.SELECT_CATEGORIES: {
      return {
        ...state,
        selectedCategories: action.payload,
        isSelected: true,
      };
    }
    case SelectCategoriesActionType.UNSELECT_CATEGORIES: {
      return {
        ...state,
        isSelected: false,
      };
    }
    default:
      return state;
  }
};
