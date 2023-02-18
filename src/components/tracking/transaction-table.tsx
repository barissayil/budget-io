import { Text } from "@mantine/core";
import { Transaction } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import TransactionActionsGroup from "@components/tracking/transaction-actions-group";
import { useState } from "react";
import { sortBy } from "lodash";
import useSWR from "swr";

type Props = {
  monthIndex: number;
  selectedCategory: string | null;
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
  mobileView: boolean;
};

const TransactionTable = ({
  monthIndex,
  selectedCategory,
  openEditTransactionModal,
  openDeleteTransactionModal,
  mobileView,
}: Props) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "date",
    direction: "asc",
  });

  const { data: transaction } = useSWR<Transaction[], Error>(
    `/api/transaction/month/${monthIndex}`
  );

  const filteredTransactions = transaction?.filter(
    (transaction) => !selectedCategory || transaction.category === selectedCategory
  );
  const sortedFilteredTransactions = sortBy(filteredTransactions, [
    sortStatus.columnAccessor,
    "id",
  ]);
  const records =
    sortStatus.direction === "desc"
      ? sortedFilteredTransactions.reverse()
      : sortedFilteredTransactions;

  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      minHeight={records.length > 0 ? 0 : 150}
      records={records}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={transaction === undefined}
      columns={[
        { accessor: "date", sortable: true },
        { accessor: "amount", sortable: true },
        { accessor: "category" },
        {
          accessor: "subcategory",
          hidden: mobileView,
        },
        { accessor: "details", hidden: mobileView },
        {
          accessor: "actions",
          title: <Text mr="xs"></Text>,
          textAlignment: "right",
          render: (transaction) => (
            <TransactionActionsGroup
              transactionId={transaction.id}
              openEditTransactionModal={openEditTransactionModal}
              openDeleteTransactionModal={openDeleteTransactionModal}
            />
          ),
        },
      ]}
    />
  );
};

export default TransactionTable;
