import { isTempSpending } from "@lib/spending";
import { Group, ActionIcon } from "@mantine/core";
import { Edit as EditIcon, Trash as TrashIcon } from "tabler-icons-react";

type Props = {
  spendingId: string;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const SpendingActionsGroup = ({
  spendingId,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  return (
    <Group spacing={4} position="right" noWrap>
      <ActionIcon
        color="teal"
        onClick={() => openEditSpendingModal(spendingId)}
        loading={isTempSpending(spendingId)}
      >
        <EditIcon size={16} />
      </ActionIcon>
      <ActionIcon
        color="red"
        onClick={() => openDeleteSpendingModal(spendingId)}
        loading={isTempSpending(spendingId)}
      >
        <TrashIcon size={16} />
      </ActionIcon>
    </Group>
  );
};

export default SpendingActionsGroup;
