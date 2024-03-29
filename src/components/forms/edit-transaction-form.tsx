import { useForm } from "@mantine/form";
import { Transaction } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TransactionForm from "@components/forms/transaction-form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import TransactionFormSchema from "@modeling/transaction-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { getTempUUID } from "@lib/temp";

type Props = {
  transactionToUpdate: Transaction;
  transactions: Transaction[];
  monthIndex: number;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedTransactionId: Dispatch<SetStateAction<string | null>>;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
};

const EditTransactionForm = ({
  transactionToUpdate,
  transactions,
  monthIndex,
  setModalIsOpened,
  setSelectedTransactionId,
  setOpenedTransactionModal,
}: Props) => {
  const form = useForm<TransactionFormValues>({
    initialValues: {
      date: new Date(transactionToUpdate.date),
      amount: transactionToUpdate.amount,
      type: transactionToUpdate.type,
      category: transactionToUpdate.category,
      subcategory: transactionToUpdate.subcategory,
      details: transactionToUpdate.details,
    },
    validate: TransactionFormSchema,
  });

  const { mutate } = useSWRConfig();

  const handleRequest = async ({
    date,
    amount,
    type,
    category,
    subcategory,
    details,
  }: TransactionFormValues): Promise<Transaction[]> => {
    const body = {
      date: dayjs(date).format().substring(0, 10),
      amount,
      type,
      category,
      subcategory,
      details,
    };
    const updatedTransaction: Transaction = await (
      await fetch(`/api/transaction/${transactionToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    return [
      ...transactions.filter((transaction) => transaction.id !== transactionToUpdate.id),
      updatedTransaction,
    ];
  };

  const handleSubmit = async ({
    date,
    amount,
    type,
    category,
    subcategory,
    details,
  }: TransactionFormValues) => {
    setModalIsOpened(false);
    setSelectedTransactionId(null);
    setOpenedTransactionModal(null);
    const notificationId = getTempUUID();
    showLoadingNotification(notificationId, "Editing", "The transaction is being edited.");
    await mutate(
      `/api/transaction/month/${monthIndex}`,
      handleRequest({ date, amount, type, category, subcategory, details }),
      {
        optimisticData: [
          ...transactions.filter((transaction) => transaction.id !== transactionToUpdate.id),
          {
            id: getTempUUID(),
            date: dayjs(date).format().substring(0, 10),
            amount,
            type,
            category,
            subcategory,
            details,
            userId: getTempUUID(),
            userEmail: getTempUUID(),
          },
        ],
      }
    );
    updateToSuccessNotification(notificationId, "Edited", "The transaction is edited.");
  };

  return (
    <TransactionForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"UPDATE"}
      setOpenedTransactionModal={setOpenedTransactionModal}
    />
  );
};

export default EditTransactionForm;
