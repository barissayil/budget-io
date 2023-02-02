import { Dispatch, SetStateAction, useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spending-table";
import { Alert, Button, Text } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { MoodSad } from "tabler-icons-react";

type Props = {
  spendings: Spending[];
  setOpenedSpendingModal: Dispatch<SetStateAction<OpenedSpendingModal>>;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const ModifiableSpendingTable = ({
  spendings,
  setOpenedSpendingModal,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  return (
    <>
      <div className="flex flex-col flex-auto justify-between items-center gap-2 p-2">
        {spendings.length > 0 ? (
          <div>
            <SpendingTable
              spendings={spendings}
              openEditSpendingModal={openEditSpendingModal}
              openDeleteSpendingModal={openDeleteSpendingModal}
            />
          </div>
        ) : (
          <>
            <Alert title="No spendings" color="yellow">
              There are no spendings for the selected time period.
            </Alert>
            <MoodSad size={48} strokeWidth={2} color={"black"} />
          </>
        )}
        <Button onClick={() => setOpenedSpendingModal("ADD")} color="cyan">
          Add spending
        </Button>
      </div>
    </>
  );
};

export default ModifiableSpendingTable;
