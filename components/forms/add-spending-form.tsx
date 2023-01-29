import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { getISODate } from "lib/dates";
import SpendingFormValues from "@modeling/spending-form-values";
import SpendingForm from "@components/forms/spending-form";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { Check } from "tabler-icons-react";
import { showNotification, updateNotification } from "@mantine/notifications";

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

    validate: {
      date: (date) => (date ? null : "Invalid date"),
      amount: (amount) => (amount && amount > 0 ? null : "Invalid amount"),
      category: (category) => (category ? null : "Invalid category"),
    },
  });

  const add = async ({ date, amount, category }: SpendingFormValues) => {
    const body = {
      date: getISODate(date),
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

  const handleSubmit = async ({
    date,
    amount,
    category,
  }: SpendingFormValues) => {
    setModalIsOpened(false);
    setOpenedSpendingModal(null);
    showNotification({
      id: `add-spending-${date}-${amount}-${category}`,
      loading: true,
      title: "Adding spending",
      message: "The spending is being added",
      autoClose: false,
      disallowClose: true,
    });
    add({ date, amount, category });
    updateNotification({
      id: `add-spending-${date}-${amount}-${category}`,
      color: "teal",
      title: "Spending is added",
      message: "The spending is added",
      icon: <Check size={16} />,
      autoClose: 4000,
    });
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"ADD"}
      setOpenedSpendingModal={setOpenedSpendingModal}
    ></SpendingForm>
  );
};

export default AddSpendingForm;
