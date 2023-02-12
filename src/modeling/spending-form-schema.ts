import SpendingCategory from "@modeling/spending-category";

const SpendingFormSchema = Object.freeze({
  date: (date: Date) => (date ? null : "Invalid date"),
  amount: (amount: number | undefined) => (amount && amount > 0 ? null : "Invalid amount"),
  category: (category: SpendingCategory | undefined) => (category ? null : "Invalid category"),
});

export default SpendingFormSchema;
