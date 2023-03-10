import { Transaction, TransactionType } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import TransactionTable from "@components/tracking/tables/transaction-table";
import { Select } from "@mantine/core";
import FilterCategorySelect from "@components/tracking/selects/filter-category-select";

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
  const [selectedType, setSelectedType] = useState<TransactionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: transactions } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );

  const filteredTransactions = transactions?.filter(
    (transactions) =>
      !selectedType ||
      (transactions.type === selectedType &&
        (!selectedCategory || transactions.category === selectedCategory))
  );

  return (
    <div className="flex flex-auto flex-col items-center gap-2 p-2">
      <div>
        <Select
          value={selectedType}
          data={[
            { value: "SPENDING", label: "Spending" },
            { value: "EARNING", label: "Earning" },
          ]}
          clearable
          mx={1}
          placeholder="Filter by type"
          onChange={(e) => {
            setSelectedType(e as TransactionType);
            setSelectedCategory(null);
          }}
        />
      </div>
      <div className="flex">
        {selectedType ? (
          <FilterCategorySelect
            selectedType={selectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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
          filtered={selectedType !== null}
          mobileView={false}
        />
      </div>
      <div className="flex sm:hidden">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          filtered={selectedType !== null}
          mobileView={true}
        />
      </div>
    </div>
  );
};

export default FilterableTransactionTable;
