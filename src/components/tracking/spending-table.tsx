import { Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import SpendingActionsGroup from "@components/tracking/spending-actions-group";
import { useState } from "react";
import { sortBy } from "lodash";

type Props = {
  spendings: Spending[] | undefined;
  selectedCategory: string | null;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const SpendingTable = ({
  spendings,
  selectedCategory,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "date",
    direction: "asc",
  });
  const filteredSpendings = spendings?.filter(
    (spending) => !selectedCategory || spending.category === selectedCategory
  );
  const sortedFilteredSpendings = sortBy(filteredSpendings, [sortStatus.columnAccessor, "id"]);
  const records =
    sortStatus.direction === "desc" ? sortedFilteredSpendings.reverse() : sortedFilteredSpendings;

  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      minHeight={records.length > 0 ? 0 : 150}
      records={records}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={spendings === undefined}
      columns={[
        { accessor: "date", sortable: true },
        { accessor: "amount", sortable: true },
        { accessor: "category", sortable: true },
        {
          accessor: "actions",
          title: <Text mr="xs"></Text>,
          textAlignment: "right",
          render: (spending) => (
            <SpendingActionsGroup
              spendingId={spending.id}
              openEditSpendingModal={openEditSpendingModal}
              openDeleteSpendingModal={openDeleteSpendingModal}
            />
          ),
        },
      ]}
    />
  );
};

export default SpendingTable;
