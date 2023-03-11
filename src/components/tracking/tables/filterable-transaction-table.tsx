import { Transaction } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import TransactionTable from "@components/tracking/tables/transaction-table";
import { Select } from "@mantine/core";
import FilterCategorySelect from "@components/tracking/selects/filter-category-select";
import TransactionFilters from "@modeling/transaction-filters";
import FilterTypeSelect from "@components/tracking/selects/filter-type-select";
import FilterSubcategorySelect from "../selects/filter-subcategory-select";

type Props = {
  monthIndex: number;
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
};

const FilterableTransactionTable = ({
  monthIndex,
  openEditTransactionModal,
  openDeleteTransactionModal,
}: Props) => {
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({
    type: null,
    category: null,
    subcategory: null,
  });

  const { data: transactions } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );

  const filteredTransactions = transactions?.filter(({ type, category, subcategory }) => {
    if (!transactionFilters.type) return true;
    if (type !== transactionFilters.type) return false;
    if (!transactionFilters.category) return true;
    if (category !== transactionFilters.category) return false;
    if (!transactionFilters.subcategory) return true;
    if (subcategory !== transactionFilters.subcategory) return false;
    return true;
  });

  return (
    <div className="flex flex-auto flex-col items-center gap-3">
      <div className="flex flex-col gap-1">
        <FilterTypeSelect
          transactionFilters={transactionFilters}
          setTransactionFilters={setTransactionFilters}
        />
        {transactionFilters.type ? (
          <FilterCategorySelect
            transactionFilters={transactionFilters}
            setTransactionFilters={setTransactionFilters}
          />
        ) : (
          <Select placeholder="Filter by category" data={[]} disabled={true} />
        )}
        {transactionFilters.category ? (
          <FilterSubcategorySelect
            transactionFilters={transactionFilters}
            setTransactionFilters={setTransactionFilters}
          />
        ) : (
          <Select placeholder="Filter by subcategory" data={[]} disabled={true} />
        )}
      </div>
      <div className="hidden sm:flex">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          filtered={transactionFilters.type !== null}
          mobileView={false}
        />
      </div>
      <div className="flex sm:hidden">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          filtered={transactionFilters.type !== null}
          mobileView={true}
        />
      </div>
    </div>
  );
};

export default FilterableTransactionTable;
