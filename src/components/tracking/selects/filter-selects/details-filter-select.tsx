import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const DetailsFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const swrKey = `/api/transaction/previously-used/${transactionFilters.type as TransactionType}/${
    transactionFilters.category as string
  }/${transactionFilters.subcategory as string}/details`;

  return (
    <TransactionDataFilterSelect
      swrKey={swrKey}
      value={transactionFilters.details}
      dataName="details"
      onChange={(e) => {
        setTransactionFilters({
          type: transactionFilters.type,
          category: transactionFilters.category,
          subcategory: transactionFilters.subcategory,
          details: e as string | null,
        });
      }}
    />
  );
};

export default DetailsFilterSelect;
