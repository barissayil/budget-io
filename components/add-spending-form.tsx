import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { getISODate } from "lib/dates";
import SpendingFormValues from "@modeling/spending-form-values";
import SpendingForm from "@components/spending-form";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

const AddSpendingForm = ({ spendings, setSpendings }: Props) => {
  const form = useForm<SpendingFormValues>({
    initialValues: {
      date: new Date(),
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
    const spending: Spending = await (
      await fetch(`/api/spending`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
    console.table(spending);
    setSpendings([...spendings, spending]);
  };

  return (
    <SpendingForm
      handleSubmit={handleSubmit}
      form={form}
      formType={"ADD"}
    ></SpendingForm>
  );
};

export default AddSpendingForm;
