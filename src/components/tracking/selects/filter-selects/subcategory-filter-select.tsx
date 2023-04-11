import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const SubcategoryFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const swrKey = `/api/transaction/previously-used/${transactionFilters.type as TransactionType}/${
    transactionFilters.category as string
  }/subcategory`;

  return (
    <TransactionDataFilterSelect
      swrKey={swrKey}
      value={transactionFilters.subcategory}
      dataName="subcategory"
      onChange={(e) => {
        setTransactionFilters({
          type: transactionFilters.type,
          category: transactionFilters.category,
          subcategory: e as string | null,
          details: null,
        });
      }}
    />
  );
};

export default SubcategoryFilterSelect;
