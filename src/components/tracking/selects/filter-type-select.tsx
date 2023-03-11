import { Select } from "@mantine/core";
import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const FilterTypeSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  return (
    <Select
      value={transactionFilters.type}
      data={[
        { value: "SPENDING", label: "Spending" },
        { value: "EARNING", label: "Earning" },
      ]}
      clearable
      placeholder="Filter by type"
      onChange={(e) => {
        setTransactionFilters({ type: e as TransactionType | null, category: null });
      }}
    />
  );
};

export default FilterTypeSelect;
