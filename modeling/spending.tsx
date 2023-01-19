import { SpendingCategory } from "./spending-category";

export type Spending = {
  id: number;
  date: Date;
  amount: number;
  category: SpendingCategory;
};
