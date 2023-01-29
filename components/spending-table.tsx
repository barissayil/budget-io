import { ActionIcon, Group, Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import { Edit, Trash } from "tabler-icons-react";

type Props = {
  spendings: Spending[];
  openEditSpendingModal: (id: number) => void;
  openDeleteModalForSpending: (id: number) => void;
};

const SpendingTable = ({
  spendings,
  openEditSpendingModal,
  openDeleteModalForSpending,
}: Props) => {
  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
      minHeight={150}
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
            <Group spacing={4} position="right" noWrap>
              <ActionIcon
                color="teal"
                onClick={() => openEditSpendingModal(spending.id)}
              >
                <Edit size={16} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => openDeleteModalForSpending(spending.id)}
              >
                <Trash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={spendings}
    />
  );
};

export default SpendingTable;
