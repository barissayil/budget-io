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
          onChange={(e) => {
            setTransactionFilters({
              type: transactionFilters.type,
              category: e,
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
