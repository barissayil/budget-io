import { Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import SpendingActionsGroup from "@components/tracking/spending-actions-group";
import { useState } from "react";
import { sortBy } from "lodash";
import useSWR from "swr";

type Props = {
  monthIndex: number;
  selectedCategory: string | null;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const SpendingTable = ({
  monthIndex,
  selectedCategory,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "date",
    direction: "asc",
  });

  const { data: spendings } = useSWR<Spending[], Error>(`/api/spending/month/${monthIndex}`);

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
