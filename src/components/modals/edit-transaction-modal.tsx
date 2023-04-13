import { Modal } from "@mantine/core";
import EditTransactionForm from "@components/forms/edit-transaction-form";
import { Transaction } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";

type Props = {
  transactionToUpdate: Transaction;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
  transactions: Transaction[];
  monthIndex: number;
  setSelectedTransactionId: Dispatch<SetStateAction<string | null>>;
};

const EditTransactionModal = ({
  transactionToUpdate,
  setOpenedTransactionModal,
  transactions,
  monthIndex,
  setSelectedTransactionId,
}: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <Modal
      opened={isOpened}
      onClose={() => setOpenedTransactionModal(null)}
      centered
      title="Edit transaction"
    >
      <EditTransactionForm
        transactionToUpdate={transactionToUpdate}
        transactions={transactions}
        monthIndex={monthIndex}
        setModalIsOpened={setIsOpened}
        setSelectedTransactionId={setSelectedTransactionId}
        setOpenedTransactionModal={setOpenedTransactionModal}
      />
    </Modal>
  );
};

export default EditTransactionModal;
