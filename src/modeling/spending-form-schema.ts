const SpendingFormSchema = Object.freeze({
  date: (date: Date) => (date ? null : "Invalid date"),
  amount: (amount: number | undefined) => (amount && amount > 0 ? null : "Invalid amount"),
  category: (category: string | undefined) => (category ? null : "Invalid category"),
});

export default SpendingFormSchema;
