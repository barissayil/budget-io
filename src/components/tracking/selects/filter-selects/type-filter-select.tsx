import { Select } from "@mantine/core";
import TransactionFilters from "@modeling/transaction-filters";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const TypeFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  return (
    <Select
      value={transactionFilters.type}
      data={[
        { value: "SPENDING", label: "Spending" },
        { value: "EARNING", label: "Earning" },
      ]}
      clearable
      placeholder="Filter by type"
      onChange={(type) => {
        setTransactionFilters({
          type: type as TransactionType | null,
          category: null,
          subcategory: null,
          details: null,
        });
      }}
    />
  );
};

export default TypeFilterSelect;
