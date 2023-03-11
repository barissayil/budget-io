import { TransactionType } from "@prisma/client";

type TransactionFilters = {
  type: TransactionType | null;
  category: string | null;
};

export default TransactionFilters;
