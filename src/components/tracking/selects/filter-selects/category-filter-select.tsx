import TransactionFilters from "@modeling/transaction-filters";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";
import { Select } from "@mantine/core";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const CategoryFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  return (
    <>
      {transactionFilters.type ? (
        <TransactionDataFilterSelect
          swrKey={`/api/transaction/previously-used/${transactionFilters.type}/category`}
          value={transactionFilters.category}
          dataName="category"
          onChange={(category) => {
            setTransactionFilters({
              type: transactionFilters.type,
              category,
              subcategory: null,
              details: null,
            });
          }}
        />
      ) : (
        <Select placeholder="Filter by category" data={[]} disabled={true} />
      )}
    </>
  );
};

export default CategoryFilterSelect;
