import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SelectCategoriesActionType } from "../../../store/reducers/common/types";

import {
  Categories,
  incomeCategoriesList,
  outcomeCategoriesList,
  allCategoriesList,
  CategoryByType,
} from "./types";

export const useCategoryController = (categoriesList: Categories) => {
  const dispatch = useDispatch();
  const { isSelected } = useSelector(
    (store: RootState) => store.selectCategories
  );
  const [isActive, setIsActive] = useState<number | null>(null);

  const selectIcon = (iconId: string, index: number) => {
    setIsActive(index);
    dispatch({
      type: SelectCategoriesActionType.SELECT_CATEGORIES,
      payload: iconId,
    });
  };

  let categoryByType: CategoryByType = [];

  switch (categoriesList) {
    case Categories.incomeTransaction:
      categoryByType = incomeCategoriesList;
      break;
    case Categories.outcomeTransaction:
      categoryByType = outcomeCategoriesList;
      break;
    case Categories.allCategories:
      categoryByType = allCategoriesList;
      break;
    default:
      break;
  }
  return { categoryByType, selectIcon, isActive, isSelected };
};
