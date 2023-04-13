import TransactionFilters from "@modeling/transaction-filters";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";
import { Select } from "@mantine/core";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const SubcategoryFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  return (
    <>
      {transactionFilters.type && transactionFilters.category ? (
        <TransactionDataFilterSelect
          swrKey={`/api/transaction/previously-used/${transactionFilters.type}/${transactionFilters.category}/subcategory`}
          value={transactionFilters.subcategory}
          dataName="subcategory"
          onChange={(e) => {
            setTransactionFilters({
              type: transactionFilters.type,
              category: transactionFilters.category,
              subcategory: e,
              details: null,
            });
          }}
        />
      ) : (
        <Select placeholder="Filter by subcategory" data={[]} disabled={true} />
      )}
    </>
  );
};

export default SubcategoryFilterSelect;
