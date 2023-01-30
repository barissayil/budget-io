import { useState, useEffect } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spending-table";
import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { Check } from "tabler-icons-react";
import EditSpendingModal from "@components/modals/edit-spending-modal";
import AddSpendingModal from "@components/modals/add-spending-modal";

type Props = {
  initialSpendings: Spending[];
};

const ModifiableSpendingTable = ({ initialSpendings }: Props) => {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);

  const [openedSpendingModal, setOpenedSpendingModal] =
    useState<OpenedSpendingModal>(null);

  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(
    null
  );

  const deleteSpending = async (id: number): Promise<void> => {
    showNotification({
      id: `delete-spending-${id}`,
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
      id: `delete-spending-${id}`,
      color: "teal",
      title: "Spending is deleted",
      message: "The spending is deleted",
      icon: <Check size={16} />,
      autoClose: 4000,
    });
  };

  const getSpending = (id: number): Spending => {
    return spendings.find((spending) => spending.id === id) as Spending;
  };

  const openEditSpendingModal = (id: number) => {
    setSelectedSpendingId(id);
    setOpenedSpendingModal("EDIT");
  };

  const openDeleteModalForSpending = (id: number) =>
    openConfirmModal({
      title: "Delete spending",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this spending?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => await deleteSpending(id),
    });

  return (
    <div className="flex flex-col items-center m-5 p-10 bg-slate-200">
      {openedSpendingModal === "ADD" && (
        <AddSpendingModal
          setOpenedSpendingModal={setOpenedSpendingModal}
          spendings={spendings}
          setSpendings={setSpendings}
        />
      )}
      {openedSpendingModal === "EDIT" && (
        <EditSpendingModal
          spendingToUpdate={getSpending(selectedSpendingId as number)}
          setOpenedSpendingModal={setOpenedSpendingModal}
          spendings={spendings}
          setSpendings={setSpendings}
          setSelectedSpendingId={setSelectedSpendingId}
        />
      )}
      <SpendingTable
        spendings={spendings}
        openEditSpendingModal={openEditSpendingModal}
        openDeleteModalForSpending={openDeleteModalForSpending}
      />
      <div className="flex mt-10">
        <Button onClick={() => setOpenedSpendingModal("ADD")} color="cyan">
          Add spending
        </Button>
      </div>
    </div>
  );
};

export default ModifiableSpendingTable;
