import { useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spending-table";
import { Button, Text } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import EditSpendingModal from "@components/modals/edit-spending-modal";
import AddSpendingModal from "@components/modals/add-spending-modal";
import DeleteSpendingModal from "@components/modals/delete-spending-modal";

type Props = {
  initialSpendings: Spending[];
};

const ModifiableSpendingTable = ({ initialSpendings }: Props) => {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);

  const [openedSpendingModal, setOpenedSpendingModal] = useState<OpenedSpendingModal>(null);

  const [selectedSpendingId, setSelectedSpendingId] = useState<number | null>(null);

  const getSpending = (id: number): Spending => {
    return spendings.find((spending) => spending.id === id) as Spending;
  };

  const openEditSpendingModal = (id: number) => {
    setSelectedSpendingId(id);
    setOpenedSpendingModal("EDIT");
  };

  const openDeleteSpendingModal = (id: number) => {
    setSelectedSpendingId(id);
    setOpenedSpendingModal("DELETE");
  };

  return (
    <>
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
      {openedSpendingModal === "DELETE" && (
        <DeleteSpendingModal
          spendingIdToDelete={selectedSpendingId as number}
          setOpenedSpendingModal={setOpenedSpendingModal}
          spendings={spendings}
          setSpendings={setSpendings}
          setSelectedSpendingId={setSelectedSpendingId}
        />
      )}
      <div className="flex flex-col items-center gap-2 p-2 bg-slate-200">
        {spendings.length > 0 && (
          <SpendingTable
            spendings={spendings}
            openEditSpendingModal={openEditSpendingModal}
            openDeleteSpendingModal={openDeleteSpendingModal}
          />
        )}
        <Button onClick={() => setOpenedSpendingModal("ADD")} color="cyan">
          Add spending
        </Button>
      </div>
    </>
  );
};

export default ModifiableSpendingTable;
