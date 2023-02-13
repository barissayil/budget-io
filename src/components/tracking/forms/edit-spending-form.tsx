import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import SpendingCategory from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";
import SpendingForm from "@components/tracking/forms/spending-form";
import SpendingFormValues from "@modeling/spending-form-values";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingFormSchema from "@modeling/spending-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { getTempUUID } from "@lib/uuid";

type Props = {
  spendingToUpdate: Spending;
  spendings: Spending[];
  monthIndex: number;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedSpendingId: Dispatch<SetStateAction<string | null>>;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const EditSpendingForm = ({
  spendingToUpdate,
  spendings,
  monthIndex,
  setModalIsOpened,
  setSelectedSpendingId,
  setOpenedSpendingModal,
}: Props) => {
  const form = useForm<SpendingFormValues>({
    initialValues: {
      date: new Date(spendingToUpdate.date),
      amount: spendingToUpdate.amount,
      category: spendingToUpdate.category as SpendingCategory,
    },
    validate: SpendingFormSchema,
  });

  const { mutate } = useSWRConfig();

  const editSpending = async ({
    date,
    amount,
    category,
  }: SpendingFormValues): Promise<Spending[]> => {
    const body = {
      date: dayjs(date).format().substring(0, 10),
      amount,
      category,
    };
    const updatedSpending: Spending = await (
      await fetch(`/api/spending/${spendingToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    return [
      ...spendings.filter((spending) => spending.id !== spendingToUpdate.id),
      updatedSpending,
    ];
  };

  const handleSubmit = async ({ date, amount, category }: SpendingFormValues) => {
    setModalIsOpened(false);
    setSelectedSpendingId(null);
    setOpenedSpendingModal(null);
    showLoadingNotification(
      `edit-spending-${date}-${amount}-${category}`,
      "Editing",
      "The spending is being edited."
    );
    await mutate(`/api/spending/month/${monthIndex}`, editSpending({ date, amount, category }), {
      optimisticData: [
        ...spendings.filter((spending) => spending.id !== spendingToUpdate.id),
        {
          id: getTempUUID(),
          date: dayjs(date).format().substring(0, 10),
          amount,
          category,
          userId: getTempUUID(),
          userEmail: getTempUUID(),
        },
      ],
    });
    updateToSuccessNotification(
      `edit-spending-${date}-${amount}-${category}`,
      "Edited",
      "The spending is edited."
    );
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"UPDATE"}
      setOpenedSpendingModal={setOpenedSpendingModal}
    />
  );
};

export default EditSpendingForm;
