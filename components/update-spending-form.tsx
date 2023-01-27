import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import SpendingCategory from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";
import { getISODate } from "lib/dates";

type Props = {
  spendingToUpdate: Spending;
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

type Values = {
  date: Date;
  amount?: number;
  category?: SpendingCategory;
};

const UpdateSpendingForm = ({
  spendingToUpdate,
  spendings,
  setSpendings,
}: Props) => {
  console.table(spendingToUpdate);
  console.log(spendingToUpdate.date);
  console.log(new Date(spendingToUpdate.date));
  const form = useForm<Values>({
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

  const handleSubmit = async ({ date, amount, category }: Values) => {
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
    console.table(updatedSpending);
    setSpendings([
      ...spendings.filter((spending) => spending.id !== spendingToUpdate.id),
      updatedSpending,
    ]);
  };

  return (
    <div className="m-5 p-5 bg-teal-300">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DatePicker
          placeholder="Date"
          {...form.getInputProps("date")}
          className="mb-3"
        />
        <NumberInput
          placeholder="Amount"
          {...form.getInputProps("amount")}
          className="mb-3"
        />
        <Select
          placeholder="Category"
          data={Object.entries(SpendingCategory).map(([label, value]) => ({
            label,
            value,
          }))}
          {...form.getInputProps("category")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </div>
  );
};

export default UpdateSpendingForm;
