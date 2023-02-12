import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import SpendingCategory from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";
import { convertDateToIsoDateString } from "@lib/dates";
import SpendingForm from "@components/tracking/forms/spending-form";
import SpendingFormValues from "@modeling/spending-form-values";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingFormSchema from "@modeling/spending-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";

type Props = {
  spendingToUpdate: Spending;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedSpendingId: Dispatch<SetStateAction<string | null>>;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const EditSpendingForm = ({
  spendingToUpdate,
  spendings,
  setSpendings,
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

  const editSpending = async ({ date, amount, category }: SpendingFormValues) => {
    const body = {
      date: convertDateToIsoDateString(date),
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
    setSpendings([
      ...spendings.filter((spending) => spending.id !== spendingToUpdate.id),
      updatedSpending,
    ]);
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
    await editSpending({ date, amount, category });
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
