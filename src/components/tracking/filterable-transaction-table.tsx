import { Transaction } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import TransactionTable from "@components/tracking/transaction-table";
import { Loader, Select } from "@mantine/core";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: transactions } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );
  const { data: categories } = useSWR<string[], Error>(
    `/api/transaction/previously-used/SPENDING/category`
  );

  const filteredTransactions = transactions?.filter(
    (transactions) => !selectedCategory || transactions.category === selectedCategory
  );

  return (
    <div className="flex flex-auto flex-col items-center gap-2 p-2">
      <div className="flex">
        {categories ? (
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={categories}
            clearable
            searchable
            mx={1}
            placeholder="Filter by category"
            maxDropdownHeight={280}
          />
        ) : (
          <Loader />
        )}
      </div>
      <div className="hidden sm:flex">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          mobileView={false}
        />
      </div>
      <div className="flex sm:hidden">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          mobileView={true}
        />
      </div>
    </div>
  );
};

export default FilterableTransactionTable;
