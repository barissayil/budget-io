import SpendingCategory from "@modeling/spending-category";

type SpendingFormValues = {
  dateObject: Date;
  amount?: number;
  category?: SpendingCategory;
};

export default SpendingFormValues;
