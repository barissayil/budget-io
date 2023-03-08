import { Text } from "@mantine/core";
import { Transaction } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import TransactionActionsGroup from "@components/tracking/transaction-actions-group";
import { useState } from "react";
import { sortBy } from "lodash";

type Props = {
  transactions?: Transaction[];
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
  mobileView: boolean;
};

const TransactionTable = ({
  transactions,
  openEditTransactionModal,
  openDeleteTransactionModal,
  mobileView,
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
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      minHeight={sortedTransactions.length > 0 ? 0 : 150}
      records={sortedTransactions}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={transactions === undefined}
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
