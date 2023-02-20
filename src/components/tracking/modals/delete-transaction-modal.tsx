import { Button, Group, Modal, Text } from "@mantine/core";
import { Transaction } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import { useSWRConfig } from "swr";
import { getTempUUID } from "@lib/temp";

type Props = {
  transactionIdToDelete: string;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
  transactions: Transaction[];
  monthIndex: number;
  setSelectedTransactionId: Dispatch<SetStateAction<string | null>>;
};

const DeleteTransactionModal = ({
  transactionIdToDelete,
  setOpenedTransactionModal,
  transactions,
  monthIndex,
  setSelectedTransactionId,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const { mutate } = useSWRConfig();

  const handleRequest = async (): Promise<Transaction[]> => {
    const deletedTransaction = await (
      await fetch(`/api/transaction/${transactionIdToDelete}`, {
        method: "DELETE",
      })
    ).json();
    return transactions.filter((transaction) => transaction.id !== deletedTransaction.id);
  };

  const handleSubmit = async () => {
    setIsOpened(false);
    setSelectedTransactionId(null);
    setOpenedTransactionModal(null);
    const notificationId = getTempUUID();
    showLoadingNotification(notificationId, "Deleting", "The transaction is being deleted.");
    await mutate(`/api/transaction/month/${monthIndex}`, handleRequest(), {
      optimisticData: [
        ...transactions.filter((transaction) => transaction.id !== transactionIdToDelete),
      ],
      revalidate: false,
    });
    updateToSuccessNotification(notificationId, "Deleted", "The transaction is deleted.");
  };

  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedTransactionModal(null)}
      centered
      title="Delete transaction"
    >
      <Text size="sm">Are you sure you want to delete this transaction?</Text>
      <Group position="right" mt="md">
        <Button type="button" variant="default" onClick={() => setOpenedTransactionModal(null)}>
          Cancel
        </Button>
        <Button type="submit" color="red" onClick={() => handleSubmit()}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteTransactionModal;
