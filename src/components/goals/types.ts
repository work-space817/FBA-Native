export interface IGoal {
  cost: number;
  expireDate: string;
  title: string;
  index: any;
  selectedCategories: string | React.ReactNode;
  id: string;
}
export interface IGoalAdd {
  title: string;
  cost: number;
}

export interface IGoalEdit {
  title: string;
  cost: number;
  expireDate: string;
}
