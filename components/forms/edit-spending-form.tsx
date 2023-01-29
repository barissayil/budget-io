import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import SpendingCategory from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";
import { getISODate } from "lib/dates";
import SpendingForm from "@components/forms/spending-form";
import SpendingFormValues from "@modeling/spending-form-values";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

type Props = {
  spendingToUpdate: Spending;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
  setModalIsOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedSpendingId: Dispatch<SetStateAction<number | null>>;
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

    validate: {
      date: (date) => (date ? null : "Invalid date"),
      amount: (amount) => (amount && amount > 0 ? null : "Invalid amount"),
      category: (category) => (category ? null : "Invalid category"),
    },
  });

  const edit = async ({ date, amount, category }: SpendingFormValues) => {
    const body = {
      date: getISODate(date),
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

  const handleSubmit = async ({
    date,
    amount,
    category,
  }: SpendingFormValues) => {
    setModalIsOpened(false);
    setSelectedSpendingId(null);
    setOpenedSpendingModal(null);
    showNotification({
      id: `edit-spending-${date}-${amount}-${category}`,
      loading: true,
      title: "Editing spending",
      message: "The spending is being edited",
      autoClose: false,
      disallowClose: true,
    });
    edit({ date, amount, category });
    updateNotification({
      id: `edit-spending-${date}-${amount}-${category}`,
      color: "teal",
      title: "Spending is edited",
      message: "The spending is edited",
      icon: <Check size={16} />,
      autoClose: 4000,
    });
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"UPDATE"}
      setOpenedSpendingModal={setOpenedSpendingModal}
    ></SpendingForm>
  );
};

export default EditSpendingForm;
