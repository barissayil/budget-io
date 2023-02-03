import { Dispatch, SetStateAction, useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spendings/spending-table";
import { Button, Select } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingCategory from "@modeling/spending-category";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-auto flex-col items-center justify-between gap-2 p-2">
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          data={Object.entries(SpendingCategory).map(([label, value]) => ({
            label,
            value,
          }))}
          clearable
        />
        <div>
          <SpendingTable
            spendings={spendings}
            selectedCategory={selectedCategory}
            openEditSpendingModal={openEditSpendingModal}
            openDeleteSpendingModal={openDeleteSpendingModal}
          />
        </div>
        <Button onClick={() => setOpenedSpendingModal("ADD")} color="cyan">
          Add spending
        </Button>
      </div>
    </>
  );
};

export default ModifiableSpendingTable;
