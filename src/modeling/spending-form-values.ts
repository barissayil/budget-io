import SpendingCategory from "@modeling/spending-category";

type SpendingFormValues = {
  date: Date;
  amount?: number;
  category?: SpendingCategory;
};

export default SpendingFormValues;
