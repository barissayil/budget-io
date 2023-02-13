import { Dispatch, SetStateAction, useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/tracking/spending-table";
import { ActionIcon, Button, Group, Select } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingCategory from "@modeling/spending-category";
import { ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon } from "tabler-icons-react";

type Props = {
  spendings: Spending[];
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  setOpenedSpendingModal: Dispatch<SetStateAction<OpenedSpendingModal>>;
  openEditSpendingModal: (id: string) => void;
  openDeleteSpendingModal: (id: string) => void;
};

const ModifiableSpendingTable = ({
  spendings,
  monthIndex,
  setMonthIndex,
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
        <Group>
          <ActionIcon color="cyan" size="xl" onClick={() => setMonthIndex(monthIndex + 1)}>
            <ArrowLeftIcon size={80} strokeWidth={2} />
          </ActionIcon>
          <Button onClick={() => setOpenedSpendingModal("ADD")} color="cyan">
            Add spending
          </Button>
          <ActionIcon
            color="cyan"
            size="xl"
            className={monthIndex === 0 ? "collapse" : ""}
            onClick={() => setMonthIndex(monthIndex - 1)}
          >
            <ArrowRightIcon size={80} strokeWidth={2} />
          </ActionIcon>
        </Group>
      </div>
    </>
  );
};

export default ModifiableSpendingTable;
