export type CategoryByType = {
  id: string;
}[];

export enum Categories {
  incomeTransaction = "Income transaction",
  outcomeTransaction = "Outcome transaction",
  allCategories = "All categories",
}
export interface ISelectCategoriesProps {
  title: string;
  categoriesList: Categories;
}

export const incomeCategoriesList: CategoryByType = [
  { id: "Salary" },
  { id: "Social payment" },
  { id: "Other" },
];

export const outcomeCategoriesList: CategoryByType = [
  { id: "Transport" },
  { id: "Shopping" },
  { id: "Travels" },
  { id: "Renovation" },
  { id: "Holidays" },
  { id: "Entertainment" },
  { id: "Other" },
];

export const allCategoriesList: CategoryByType = [
  ...incomeCategoriesList,
  ...outcomeCategoriesList,
];
