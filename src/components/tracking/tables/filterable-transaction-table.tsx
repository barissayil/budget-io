import { Transaction, TransactionType } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import TransactionTable from "@components/tracking/tables/transaction-table";
import { Select } from "@mantine/core";
import FilterCategorySelect from "@components/tracking/selects/filter-category-select";
import TransactionFilters from "@modeling/transaction-filters";

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
  });

  const { data: transactions } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );

  const filteredTransactions = transactions?.filter(
    (transactions) =>
      !transactionFilters.type ||
      (transactions.type === transactionFilters.type &&
        (!transactionFilters.category || transactions.category === transactionFilters.category))
  );

  return (
    <div className="flex flex-auto flex-col items-center gap-2 p-2">
      <div>
        <Select
          value={transactionFilters.type}
          data={[
            { value: "SPENDING", label: "Spending" },
            { value: "EARNING", label: "Earning" },
          ]}
          clearable
          mx={1}
          placeholder="Filter by type"
          onChange={(e) => {
            setTransactionFilters({ type: e as TransactionType | null, category: null });
          }}
        />
      </div>
      <div className="flex">
        {transactionFilters.type ? (
          <FilterCategorySelect
            transactionFilters={transactionFilters}
            setTransactionFilters={setTransactionFilters}
          />
        ) : (
          <Select placeholder="Filter by category" data={[]} disabled={true} className="mb-3" />
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
