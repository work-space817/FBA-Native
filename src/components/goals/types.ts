export interface IGoal {
  cost: number;
  expireDate: string;
  title: string;
  selectedCategories: string | React.ReactNode;
  id: string;
}
export interface IGoalAdd {
  title: string;
  cost: number | string;
}

export interface IGoalEdit {
  title: string;
  cost: number | string;
  expireDate: string;
}
