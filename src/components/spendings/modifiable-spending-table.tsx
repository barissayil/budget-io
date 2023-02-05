import { Dispatch, SetStateAction, useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/spendings/spending-table";
import { Button, Select } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingCategory from "@modeling/spending-category";
import SpendingsView from "@modeling/spendings-view";

type Props = {
  spendings: Spending[];
  spendingsView: string | null;
  setSpendingsView: Dispatch<SetStateAction<string | null>>;
  setOpenedSpendingModal: Dispatch<SetStateAction<OpenedSpendingModal>>;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const ModifiableSpendingTable = ({
  spendings,
  spendingsView,
  setSpendingsView,
  setOpenedSpendingModal,
  openEditSpendingModal,
  openDeleteSpendingModal,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-auto flex-col items-center justify-between gap-2 p-2">
        <div className="flex">
          <Select
            value={spendingsView}
            onChange={setSpendingsView}
            data={Object.entries(SpendingsView).map(([label, value]) => ({
              label,
              value,
            }))}
            mx={1}
            defaultValue={"THIS_MONTH"}
            defaultChecked
          />
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={Object.entries(SpendingCategory).map(([label, value]) => ({
              label,
              value,
            }))}
            clearable
            mx={1}
            placeholder="Filter by category"
          />
        </div>
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
