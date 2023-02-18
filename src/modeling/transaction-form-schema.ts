const TransactionFormSchema = Object.freeze({
  date: (date: Date) => (date ? null : "Invalid date"),
  amount: (amount: number | undefined) => (amount && amount > 0 ? null : "Invalid amount"),
  category: (category: string | undefined) => (category ? null : "Invalid category"),
  subcategory: (subcategory: string | undefined) => (subcategory ? null : "Invalid subcategory"),
  details: (details: string | undefined) => (details ? null : "Invalid details"),
});

export default TransactionFormSchema;
