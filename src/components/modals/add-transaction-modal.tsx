import { Modal } from "@mantine/core";
import { Transaction } from "@prisma/client";
import { SetStateAction, useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import AddTransactionForm from "@components/forms/add-transaction-form";

type Props = {
  transactions: Transaction[];
  monthIndex: number;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
};

const AddTransactionModal = ({ setOpenedTransactionModal, transactions, monthIndex }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedTransactionModal(null)}
      centered
      title="Add transaction"
    >
      <AddTransactionForm
        transactions={transactions}
        monthIndex={monthIndex}
        setModalIsOpened={setIsOpened}
        setOpenedTransactionModal={setOpenedTransactionModal}
      />
    </Modal>
  );
};

export default AddTransactionModal;
