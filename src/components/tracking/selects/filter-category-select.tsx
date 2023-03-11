import { LoadingOverlay, Select } from "@mantine/core";
import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const FilterCategorySelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const { data: categories } = useSWR<string[], Error>(
    `/api/transaction/previously-used/${transactionFilters.type as TransactionType}/category`
  );

  return (
    <div className="relative mb-3">
      <LoadingOverlay visible={!categories} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        value={transactionFilters.category}
        onChange={(e) => {
          setTransactionFilters({ type: transactionFilters.type, category: e as string | null });
        }}
        data={categories ?? []}
        clearable
        searchable
        mx={1}
        placeholder="Filter by category"
        maxDropdownHeight={280}
      />
    </div>
  );
};

export default FilterCategorySelect;
