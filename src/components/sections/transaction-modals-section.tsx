import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import { Transaction } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import AddTransactionModal from "@components/modals/add-transaction-modal";
import DeleteTransactionModal from "@components/modals/delete-transaction-modal";
import EditTransactionModal from "@components/modals/edit-transaction-modal";

type Props = {
  selectedTransactionId: string | null;
  openedTransactionModal: OpenedTransactionModal;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
  transactions?: Transaction[];
  monthIndex: number;
  setSelectedTransactionId: Dispatch<SetStateAction<string | null>>;
};

const TransactionModalsSection = ({
  selectedTransactionId,
  openedTransactionModal,
  setOpenedTransactionModal,
  transactions,
  monthIndex,
  setSelectedTransactionId,
}: Props) => {
  const getTransaction = (id: string): Transaction => {
    return (transactions as Transaction[]).find(
      (transaction) => transaction.id === id
    ) as Transaction;
  };

  return (
    <>
      {openedTransactionModal === "ADD" && (
        <AddTransactionModal
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
        />
      )}
      {openedTransactionModal === "EDIT" && (
        <EditTransactionModal
          transactionToUpdate={getTransaction(selectedTransactionId as string)}
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      )}
      {openedTransactionModal === "DELETE" && (
        <DeleteTransactionModal
          transactionIdToDelete={selectedTransactionId as string}
          setOpenedTransactionModal={setOpenedTransactionModal}
          transactions={transactions as Transaction[]}
          monthIndex={monthIndex}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      )}
    </>
  );
};

export default TransactionModalsSection;
