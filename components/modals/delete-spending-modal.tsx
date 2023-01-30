import { Button, Group, Modal, Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

type Props = {
  spendingIdToDelete: number;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setSelectedSpendingId: Dispatch<SetStateAction<number | null>>;
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
    setSpendings(
      spendings.filter((spending) => spending.id !== deletedSpending.id)
    );
  };

  const handleSubmit = async () => {
    setIsOpened(false);
    setSelectedSpendingId(null);
    setOpenedSpendingModal(null);
    showNotification({
      id: `delete-spending-${spendingIdToDelete}`,
      loading: true,
      title: "Deleting spending",
      message: "The spending is being deleted",
      autoClose: false,
      disallowClose: true,
    });
    await deleteSpending();
    updateNotification({
      id: `delete-spending-${spendingIdToDelete}`,
      color: "teal",
      title: "Spending is deleted",
      message: "The spending is deleted",
      icon: <Check size={16} />,
      autoClose: 4000,
    });
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
        <Button
          type="button"
          variant="default"
          onClick={() => setOpenedSpendingModal(null)}
        >
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
