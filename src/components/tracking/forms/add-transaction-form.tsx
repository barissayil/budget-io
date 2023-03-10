import { useForm } from "@mantine/form";
import { Transaction, TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TransactionFormValues from "@modeling/transaction-form-values";
import TransactionForm from "@components/tracking/forms/transaction-form";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import TransactionFormSchema from "@modeling/transaction-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { getTempUUID } from "@lib/temp";

type Props = {
  transactions: Transaction[];
  monthIndex: number;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
};

const AddTransactionForm = ({
  transactions,
  monthIndex,
  setModalIsOpened,
  setOpenedTransactionModal,
}: Props) => {
  const form = useForm<TransactionFormValues>({
    initialValues: {
      date: new Date(),
      type: TransactionType.SPENDING,
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
    const transaction: Transaction = await (
      await fetch(`/api/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    return [...transactions, transaction];
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
    setOpenedTransactionModal(null);
    const notificationId = getTempUUID();
    showLoadingNotification(notificationId, "Adding", "The transaction is being added.");
    await mutate(
      `/api/transaction/month/${monthIndex}`,
      handleRequest({ date, amount, type, category, subcategory, details }),
      {
        optimisticData: [
          ...transactions,
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
    updateToSuccessNotification(notificationId, "Added", "The transaction is added.");
  };

  return (
    <TransactionForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"ADD"}
      setOpenedTransactionModal={setOpenedTransactionModal}
    />
  );
};

export default AddTransactionForm;
