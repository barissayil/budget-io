import { Button, Group, Modal, Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { showLoadingNotification, updateToSuccessNotification } from "lib/notifications";

type Props = {
  spendingIdToDelete: string;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setSelectedSpendingId: Dispatch<SetStateAction<string | null>>;
};

const DeleteSpendingModal = ({
  spendingIdToDelete,
  setOpenedSpendingModal,
  spendings,
  setSpendings,
  setSelectedSpendingId,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const deleteSpending = async (): Promise<void> => {
    const deletedSpending = await (
      await fetch(`/api/spending/${spendingIdToDelete}`, {
        method: "DELETE",
      })
    ).json();
    setSpendings(spendings.filter((spending) => spending.id !== deletedSpending.id));
  };

  const handleSubmit = async () => {
    setIsOpened(false);
    setSelectedSpendingId(null);
    setOpenedSpendingModal(null);
    showLoadingNotification(
      `delete-spending-${spendingIdToDelete}`,
      "Deleting",
      "The spending is being deleted."
    );
    await deleteSpending();
    updateToSuccessNotification(
      `delete-spending-${spendingIdToDelete}`,
      "Deleted",
      "The spending is deleted."
    );
  };

  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedSpendingModal(null)}
      centered
      title="Delete spending"
    >
      <Text size="sm">Are you sure you want to delete this spending?</Text>
      <Group position="right" mt="md">
        <Button type="button" variant="default" onClick={() => setOpenedSpendingModal(null)}>
          Cancel
        </Button>
        <Button type="submit" color="red" onClick={() => handleSubmit()}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteSpendingModal;
