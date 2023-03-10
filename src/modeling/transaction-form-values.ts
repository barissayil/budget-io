import { TransactionType } from "@prisma/client";

type TransactionFormValues = {
  date: Date;
  amount?: number;
  type: TransactionType;
  category?: string;
  subcategory?: string;
  details?: string;
};

export default TransactionFormValues;
