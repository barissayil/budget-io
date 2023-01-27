import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Spending } from "@prisma/client";
import { DataTable } from "mantine-datatable";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, Edit, Trash, Check } from "tabler-icons-react";
import UpdateSpendingForm from "./update-spending-form";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

const SpendingTable = ({ spendings, setSpendings }: Props) => {
  const [spendingToUpdate, setSpendingToUpdate] = useState<Spending | null>(
    null
  );

  const deleteSpending = async (id: number): Promise<void> => {
    showNotification({
      id: "delete-spending",
      loading: true,
      title: "Deleting spending",
      message: "The spending is being deleted",
      autoClose: false,
      disallowClose: true,
    });
    const deletedSpending = await (
      await fetch(`/api/spending/${id}`, {
        method: "DELETE",
      })
    ).json();
    setSpendings(
      spendings.filter((spending) => spending.id !== deletedSpending.id)
    );
    updateNotification({
      id: "delete-spending",
      color: "teal",
      title: "Spending is deleted",
      message: "The spending is deleted",
      icon: <Check size={16} />,
      autoClose: 2000,
    });
  };

  const openEditModalForSpending = (id: number) => {
    setSpendingToUpdate(
      spendings.find((spending) => spending.id === id) as Spending
    );
  };

  return (
    <>
      <Modal
        opened={spendingToUpdate !== null}
        onClose={() => setSpendingToUpdate(null)}
      >
        {spendingToUpdate && (
          <UpdateSpendingForm
            spendingToUpdate={spendingToUpdate}
            spendings={spendings}
            setSpendings={setSpendings}
          />
        )}
      </Modal>
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
                  color="green"
                  onClick={() => console.log("show " + spending.id)}
                >
                  <Eye size={16} />
                </ActionIcon>
                <ActionIcon
                  color="blue"
                  onClick={() => openEditModalForSpending(spending.id)}
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
    </>
  );
};

export default SpendingTable;
