import { Button, Group, Modal, Text } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import { useSWRConfig } from "swr";

type Props = {
  spendingIdToDelete: string;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
  spendings: Spending[];
  monthIndex: number;
  setSelectedSpendingId: Dispatch<SetStateAction<string | null>>;
};

const DeleteSpendingModal = ({
  spendingIdToDelete,
  setOpenedSpendingModal,
  spendings,
  monthIndex,
  setSelectedSpendingId,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const { mutate } = useSWRConfig();

  const handleRequest = async (): Promise<Spending[]> => {
    const deletedSpending = await (
      await fetch(`/api/spending/${spendingIdToDelete}`, {
        method: "DELETE",
      })
    ).json();
    return spendings.filter((spending) => spending.id !== deletedSpending.id);
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
    await mutate(`/api/spending/month/${monthIndex}`, handleRequest(), {
      optimisticData: [...spendings.filter((spending) => spending.id !== spendingIdToDelete)],
      revalidate: false,
    });
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
