export interface IGoal {
  cost: number; //! number
  expireDate: string;
  title: string;
  selectedCategories: string;
  id: string;
}
export interface IGoalAdd {
  title: string;
  cost: string; //! string
  expireDate: string;
  selectedCategories: string;
}
export interface IGoalEdit {
  title: string;
  cost: string;
  expireDate: string;
}
