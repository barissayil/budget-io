import { LoadingOverlay, Select } from "@mantine/core";
import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const FilterSubcategorySelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const { data: subcategories } = useSWR<string[], Error>(
    `/api/transaction/previously-used/${transactionFilters.type as TransactionType}/${
      transactionFilters.category as string
    }/subcategory`
  );

  return (
    <div className="relative" data-cy="filter-subcategory-select">
      <LoadingOverlay visible={!subcategories} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        value={transactionFilters.subcategory}
        onChange={(e) => {
          setTransactionFilters({
            type: transactionFilters.type,
            category: transactionFilters.category,
            subcategory: e as string | null,
            details: null,
          });
        }}
        data={subcategories ?? []}
        clearable
        placeholder="Filter by subcategory"
        maxDropdownHeight={280}
      />
    </div>
  );
};

export default FilterSubcategorySelect;
