import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import SpendingFormValues from "@modeling/spending-form-values";
import SpendingForm from "@components/tracking/forms/spending-form";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SpendingFormSchema from "@modeling/spending-form-schema";
import { showLoadingNotification, updateToSuccessNotification } from "@lib/notifications";
import dayjs from "dayjs";

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
      date: new Date(),
    },
    validate: SpendingFormSchema,
  });

  const addSpending = async ({ date, amount, category }: SpendingFormValues) => {
    const body = {
      date: dayjs(date).format().substring(0, 10),
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

  const handleSubmit = async ({ date, amount, category }: SpendingFormValues) => {
    setModalIsOpened(false);
    setOpenedSpendingModal(null);
    showLoadingNotification(
      `add-spending-${date}-${amount}-${category}`,
      "Adding",
      "The spending is being added."
    );
    await addSpending({ date, amount, category });
    updateToSuccessNotification(
      `add-spending-${date}-${amount}-${category}`,
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
