import TransactionFilters from "@modeling/transaction-filters";
import { Dispatch, SetStateAction } from "react";
import TransactionDataFilterSelect from "@components/tracking/selects/filter-selects/transaction-data-filter-select";
import { Select } from "@mantine/core";

type Props = {
  transactionFilters: TransactionFilters;
  setTransactionFilters: Dispatch<SetStateAction<TransactionFilters>>;
};

const DetailsFilterSelect = ({ transactionFilters, setTransactionFilters }: Props) => {
  return (
    <>
      {transactionFilters.type && transactionFilters.category && transactionFilters.subcategory ? (
        <TransactionDataFilterSelect
          swrKey={`/api/transaction/previously-used/${transactionFilters.type}/${transactionFilters.category}/${transactionFilters.subcategory}/details`}
          value={transactionFilters.details}
          dataName="details"
          onChange={(e) => {
            setTransactionFilters({
              type: transactionFilters.type,
              category: transactionFilters.category,
              subcategory: transactionFilters.subcategory,
              details: e,
            });
          }}
        />
      ) : (
        <Select placeholder="Filter by details" data={[]} disabled={true} />
      )}
    </>
  );
};

export default DetailsFilterSelect;
