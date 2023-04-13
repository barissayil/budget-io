import { Loader, Text } from "@mantine/core";
import { Transaction, TransactionType } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import TransactionActionsGroup from "@components/groups/transaction-actions-group";
import { useState } from "react";
import { sortBy } from "lodash";
import TotalPaper from "@components/papers/total-paper";
import { shortenString } from "@lib/string";

type Props = {
  transactions?: Transaction[];
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
  filtered: boolean;
  isCompact: boolean;
};

const TransactionTable = ({
  transactions,
  openEditTransactionModal,
  openDeleteTransactionModal,
  filtered,
  isCompact,
}: Props) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "date",
    direction: "asc",
  });

  const sortedTransactions =
    sortStatus.direction === "asc"
      ? sortBy(transactions, [sortStatus.columnAccessor, "id"])
      : sortBy(transactions, [sortStatus.columnAccessor, "id"]).reverse();

  return (
    <div
      className="flex flex-auto flex-col items-center gap-2"
      data-cy={isCompact ? "compact-transaction-table" : "non-compact-transaction-table"}
    >
      <DataTable
        withBorder
        textSelectionDisabled
        shadow="xs"
        minHeight={sortedTransactions.length > 0 ? 0 : 150}
        records={sortedTransactions}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        fetching={transactions === undefined}
        noRecordsText="No transactions"
        columns={[
          { accessor: "date", sortable: true, hidden: isCompact },
          {
            accessor: "day",
            sortable: true,
            hidden: !isCompact,
            render: ({ date }) => date.slice(8, 10),
          },
          {
            accessor: "amount",
            sortable: true,
            textAlignment: "right",
            render: ({ amount }) => amount.toFixed(2),
          },
          {
            accessor: "category",
            render: ({ category }) => shortenString(category, isCompact ? 10 : 15),
          },
          {
            accessor: "subcategory",
            hidden: isCompact,
            render: ({ subcategory }) => shortenString(subcategory, 15),
          },
          {
            accessor: "details",
            hidden: isCompact,
            render: ({ details }) => shortenString(details, 15),
          },
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
        rowClassName={({ type }) =>
          type === TransactionType.SPENDING
            ? "bg-gradient-to-r from-red-100"
            : "bg-gradient-to-r from-indigo-100"
        }
      />
      {transactions ? <TotalPaper transactions={transactions} filtered={filtered} /> : <Loader />}
    </div>
  );
};

export default TransactionTable;
