import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import SpendingCategory from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";
import { getISODate } from "lib/dates";
import SpendingForm from "@components/spending-form";
import SpendingFormValues from "@modeling/spending-form-values";

type Props = {
  spendingToUpdate: Spending;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

const UpdateSpendingForm = ({
  spendingToUpdate,
  spendings,
  setSpendings,
}: Props) => {
  const form = useForm<SpendingFormValues>({
    initialValues: {
      date: new Date(spendingToUpdate.date),
      amount: spendingToUpdate.amount,
      category: spendingToUpdate.category as SpendingCategory,
    },

    validate: {
      amount: (amount) => (amount && amount > 0 ? null : "Invalid amount"),
      category: (category) => (category ? null : "Invalid category"),
    },
  });

  const handleSubmit = async ({
    date,
    amount,
    category,
  }: SpendingFormValues) => {
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

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"UPDATE"}
    ></SpendingForm>
  );
};

export default UpdateSpendingForm;
