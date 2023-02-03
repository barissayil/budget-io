import { Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import SpendingActionsGroup from "@components/spendings/spending-actions-group";
import { useEffect, useState } from "react";
import { sortBy } from "lodash";

type Props = {
  spendings: Spending[];
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
  const [records, setRecords] = useState(sortBy(spendings, "date"));
  const [filteredSpendingsLength, setFilteredSpendingsLength] = useState(spendings.length);

  useEffect(() => {
    const filteredSpendings = spendings.filter(
      (spending) => !selectedCategory || spending.category === selectedCategory
    );
    setFilteredSpendingsLength(filteredSpendings.length);
    const sortedFilteredSpendings = sortBy(filteredSpendings, sortStatus.columnAccessor);
    setRecords(
      sortStatus.direction === "desc" ? sortedFilteredSpendings.reverse() : sortedFilteredSpendings
    );
  }, [selectedCategory, sortStatus, spendings]);

  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      minHeight={filteredSpendingsLength > 0 ? 0 : 150}
      records={records}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
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
