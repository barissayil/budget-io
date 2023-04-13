import { isTemp } from "@lib/temp";
import { Group, ActionIcon } from "@mantine/core";
import { Edit as EditIcon, Trash as TrashIcon } from "tabler-icons-react";

type Props = {
  transactionId: string;
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
};

const TransactionActionsGroup = ({
  transactionId,
  openEditTransactionModal,
  openDeleteTransactionModal,
}: Props) => {
  return (
    <Group spacing={4} position="right" noWrap>
      <ActionIcon
        color="teal"
        onClick={() => openEditTransactionModal(transactionId)}
        loading={isTemp(transactionId)}
      >
        <EditIcon size={16} />
      </ActionIcon>
      <ActionIcon
        color="red"
        onClick={() => openDeleteTransactionModal(transactionId)}
        loading={isTemp(transactionId)}
      >
        <TrashIcon size={16} />
      </ActionIcon>
    </Group>
  );
};

export default TransactionActionsGroup;
