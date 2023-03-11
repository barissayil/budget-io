import { TransactionType } from "@prisma/client";

type TransactionFilters = {
  type: TransactionType | null;
  category: string | null;
  subcategory: string | null;
  details: string | null;
};

export default TransactionFilters;
