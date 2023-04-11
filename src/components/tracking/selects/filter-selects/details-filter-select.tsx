import { LoadingOverlay, Select } from "@mantine/core";
import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const DetailsFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  const { data: subcategories } = useSWR<string[], Error>(
    `/api/transaction/previously-used/${transactionFilters.type as TransactionType}/${
      transactionFilters.category as string
    }/${transactionFilters.subcategory as string}/details`
  );

  return (
    <div className="relative" data-cy="filter-details-select">
      <LoadingOverlay visible={!subcategories} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        value={transactionFilters.details}
        onChange={(e) => {
          setTransactionFilters({
            type: transactionFilters.type,
            category: transactionFilters.category,
            subcategory: transactionFilters.subcategory,
            details: e as string | null,
          });
        }}
        data={subcategories ?? []}
        clearable
        placeholder="Filter by details"
        maxDropdownHeight={280}
      />
    </div>
  );
};

export default DetailsFilterSelect;
