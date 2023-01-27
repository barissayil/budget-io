import { ActionIcon, Group, Table, Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import { Dispatch, SetStateAction } from "react";
import { Eye, Edit, Trash } from "tabler-icons-react";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

const SpendingTable = ({ spendings, setSpendings }: Props) => {
  const deleteSpending = async (id: number): Promise<void> => {
    const deletedSpending = await (
      await fetch(`/api/spending/${id}`, {
        method: "DELETE",
      })
    ).json();
    setSpendings(
      spendings.filter((spending) => spending.id !== deletedSpending.id)
    );
  };

  return (
    <DataTable
      withBorder
      textSelectionDisabled
      shadow="xs"
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
                color="green"
                onClick={() => console.log("show " + spending.id)}
              >
                <Eye size={16} />
              </ActionIcon>
              <ActionIcon
                color="blue"
                onClick={() => console.log("edit " + spending.id)}
              >
                <Edit size={16} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => deleteSpending(spending.id)}
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
