export interface IModalCloser {
  isModalClose: boolean;
}
export enum ModalCloserActionType {
  MODAL_CLOSE = "MODAL_CLOSE",
}
export interface ISelectCategories {
  selectedCategories: string;
  isSelected: boolean;
}
export enum SelectCategoriesActionType {
  SELECT_CATEGORIES = "SELECT_CATEGORIES",
  UNSELECT_CATEGORIES = "UNSELECT_CATEGORIES",
}

export interface IScrollViewPosition {
  keyboardAwarePosition: number;
}
export enum ScrollViewPositionActionType {
  SET_POSITION = "SET_POSITION",
}
