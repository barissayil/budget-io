import { Dispatch, SetStateAction, useState } from "react";
import TransactionTable from "@components/tracking/transaction-table";
import { ActionIcon, Button, Group, Loader, Select } from "@mantine/core";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import {
  SquareArrowRight as ArrowRightIcon,
  SquareArrowLeft as ArrowLeftIcon,
} from "tabler-icons-react";
import useSWR from "swr";

type Props = {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  setOpenedTransactionModal: Dispatch<SetStateAction<OpenedTransactionModal>>;
  openEditTransactionModal: (id: string) => void;
  openDeleteTransactionModal: (id: string) => void;
};

const ModifiableTransactionTable = ({
  monthIndex,
  setMonthIndex,
  setOpenedTransactionModal,
  openEditTransactionModal,
  openDeleteTransactionModal,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = useSWR<string[], Error>(`/api/transaction/category`);

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
        <div className="hidden sm:flex">
          <TransactionTable
            monthIndex={monthIndex}
            selectedCategory={selectedCategory}
            openEditTransactionModal={openEditTransactionModal}
            openDeleteTransactionModal={openDeleteTransactionModal}
            mobileView={false}
          />
        </div>
        <div className="flex sm:hidden">
          <TransactionTable
            monthIndex={monthIndex}
            selectedCategory={selectedCategory}
            openEditTransactionModal={openEditTransactionModal}
            openDeleteTransactionModal={openDeleteTransactionModal}
            mobileView={true}
          />
        </div>
        <Group>
          <ActionIcon color="cyan" size="xl" onClick={() => setMonthIndex(monthIndex + 1)}>
            <ArrowLeftIcon size={80} strokeWidth={2} />
          </ActionIcon>
          <Button onClick={() => setOpenedTransactionModal("ADD")} color="cyan">
            Add transaction
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

export default ModifiableTransactionTable;
