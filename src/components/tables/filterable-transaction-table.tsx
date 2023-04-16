import { Transaction } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import TransactionTable from "@components/tables/transaction-table";
import CategoryFilterSelect from "@components/selects/filter-selects/category-filter-select";
import TransactionFilters from "@modeling/transaction-filters";
import TypeFilterSelect from "@components/selects/filter-selects/type-filter-select";
import SubcategoryFilterSelect from "@components/selects/filter-selects/subcategory-filter-select";
import DetailsFilterSelect from "@components/selects/filter-selects/details-filter-select";

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
    details: null,
  });

  const { data: transactions } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );

  const filteredTransactions = transactions?.filter(({ type, category, subcategory, details }) => {
    if (!transactionFilters.type) return true;
    if (type !== transactionFilters.type) return false;
    if (!transactionFilters.category) return true;
    if (category !== transactionFilters.category) return false;
    if (!transactionFilters.subcategory) return true;
    if (subcategory !== transactionFilters.subcategory) return false;
    if (!transactionFilters.details) return true;
    if (details !== transactionFilters.details) return false;
    return true;
  });

  return (
    <div className="flex flex-auto flex-col items-center gap-3">
      <div className="flex w-60 flex-col gap-1">
        <TypeFilterSelect
          transactionFilters={transactionFilters}
          setTransactionFilters={setTransactionFilters}
        />
        <CategoryFilterSelect
          transactionFilters={transactionFilters}
          setTransactionFilters={setTransactionFilters}
        />
        <SubcategoryFilterSelect
          transactionFilters={transactionFilters}
          setTransactionFilters={setTransactionFilters}
        />
        <DetailsFilterSelect
          transactionFilters={transactionFilters}
          setTransactionFilters={setTransactionFilters}
        />
      </div>
      <div className="hidden sm:flex">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          filtered={transactionFilters.type !== null}
          isCompact={false}
        />
      </div>
      <div className="flex sm:hidden">
        <TransactionTable
          transactions={filteredTransactions}
          openEditTransactionModal={openEditTransactionModal}
          openDeleteTransactionModal={openDeleteTransactionModal}
          filtered={transactionFilters.type !== null}
          isCompact={true}
        />
      </div>
    </div>
  );
};

export default FilterableTransactionTable;
