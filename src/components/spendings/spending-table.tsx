import { Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import SpendingActionsGroup from "@components/spendings/spending-actions-group";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { sortBy } from "lodash";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const SpendingTable = ({ spendings, openEditSpendingModal, openDeleteSpendingModal }: Props) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "date",
    direction: "asc",
  });
  const [records, setRecords] = useState(sortBy(spendings, "date"));

  useEffect(() => {
    const sortedSpendings = sortBy(spendings, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? sortedSpendings.reverse() : sortedSpendings);
  }, [sortStatus, spendings]);

  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
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
              spending={spending}
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
