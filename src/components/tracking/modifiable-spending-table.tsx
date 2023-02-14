import { Dispatch, SetStateAction, useState } from "react";
import { Spending } from "@prisma/client";
import SpendingTable from "@components/tracking/spending-table";
import { ActionIcon, Button, Group, Loader, Select } from "@mantine/core";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { ArrowRight as ArrowRightIcon, ArrowLeft as ArrowLeftIcon } from "tabler-icons-react";
import useSWR from "swr";

type Props = {
  spendings: Spending[] | undefined;
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

  const { data: categories } = useSWR<string[], Error>(`/api/spending/categories`);

  return (
    <>
      <div className="flex flex-auto flex-col items-center justify-between gap-2 p-2">
        <div className="flex">
          {categories ? (
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              data={categories}
              clearable
              searchable
              mx={1}
              placeholder="Filter by category"
              maxDropdownHeight={280}
            />
          ) : (
            <Loader />
          )}
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
          <Button
            onClick={() => setOpenedSpendingModal("ADD")}
            color="cyan"
            loading={spendings === undefined}
          >
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
