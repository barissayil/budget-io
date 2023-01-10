import { SpendingCategory } from "./spending-category";

export type Spending = {
  id: number,
  date: string,
  amount: number,
  category: SpendingCategory,
}