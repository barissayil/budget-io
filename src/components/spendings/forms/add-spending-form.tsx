import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { convertDateObjectToDate } from "@lib/dates";
import SpendingFormValues from "@modeling/spending-form-values";
import SpendingForm from "@components/spendings/forms/spending-form";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingFormSchema from "@modeling/spending-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const AddSpendingForm = ({
  spendings,
  setSpendings,
  setModalIsOpened,
  setOpenedSpendingModal,
}: Props) => {
  const form = useForm<SpendingFormValues>({
    initialValues: {
      dateObject: new Date(),
    },
    validate: SpendingFormSchema,
  });

  const addSpending = async ({ dateObject, amount, category }: SpendingFormValues) => {
    const body = {
      date: convertDateObjectToDate(dateObject),
      amount,
      category,
    };
    const spending: Spending = await (
      await fetch(`/api/spending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    setSpendings([...spendings, spending]);
  };

  const handleSubmit = async ({ dateObject, amount, category }: SpendingFormValues) => {
    setModalIsOpened(false);
    setOpenedSpendingModal(null);
    showLoadingNotification(
      `add-spending-${dateObject}-${amount}-${category}`,
      "Adding",
      "The spending is being added."
    );
    await addSpending({ dateObject, amount, category });
    updateToSuccessNotification(
      `add-spending-${dateObject}-${amount}-${category}`,
      "Added",
      "The spending is added."
    );
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"ADD"}
      setOpenedSpendingModal={setOpenedSpendingModal}
    />
  );
};

export default AddSpendingForm;
