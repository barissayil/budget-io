import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const CategoryFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const swrKey = `/api/transaction/previously-used/${
    transactionFilters.type as TransactionType
  }/category`;

  return (
    <TransactionDataFilterSelect
      swrKey={swrKey}
      value={transactionFilters.category}
      dataName="category"
      onChange={(e) => {
        setTransactionFilters({
          type: transactionFilters.type,
          category: e as string | null,
          subcategory: null,
          details: null,
        });
      }}
    />
  );
};

export default CategoryFilterSelect;
