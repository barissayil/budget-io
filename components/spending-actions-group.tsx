import { Group, ActionIcon } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Edit, Trash } from "tabler-icons-react";

type Props = {
  spending: Spending;
  openEditSpendingModal: (id: number) => void;
  openDeleteSpendingModal: (id: number) => void;
};

const SpendingActionsGroup = ({
  spending,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  return (
    <Group spacing={4} position="right" noWrap>
      <ActionIcon color="teal" onClick={() => openEditSpendingModal(spending.id)}>
        <Edit size={16} />
      </ActionIcon>
      <ActionIcon color="red" onClick={() => openDeleteSpendingModal(spending.id)}>
        <Trash size={16} />
      </ActionIcon>
    </Group>
  );
};

export default SpendingActionsGroup;
