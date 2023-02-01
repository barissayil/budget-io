import { Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import SpendingActionsGroup from "components/spending-actions-group";

type Props = {
  spendings: Spending[];
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const SpendingTable = ({ spendings, openEditSpendingModal, openDeleteSpendingModal }: Props) => {
  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      noRecordsText="No spending"
      columns={[
        { accessor: "date" },
        { accessor: "amount" },
        { accessor: "category" },
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
      records={spendings}
    />
  );
};

export default SpendingTable;
