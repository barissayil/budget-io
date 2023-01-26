import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Spending } from "@prisma/client";
import { SpendingCategory } from "@modeling/spending-category";
import { Dispatch, SetStateAction } from "react";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

type Values = {
  date: Date;
  amount?: number;
  category?: SpendingCategory;
};

const AddSpendingForm = ({ spendings, setSpendings }: Props) => {
  const form = useForm<Values>({
    initialValues: {
      date: new Date(),
    },

    validate: {
      amount: (amount) => (amount && amount > 0 ? null : "Invalid amount"),
      category: (category) => (category ? null : "Invalid category"),
    },
  });

  const handleSubmit = async ({ date, amount, category }: Values) => {
    const body = {
      date: date.toISOString().substring(0, 10),
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
    <div className="m-10 p-5 bg-teal-300">
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
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </div>
  );
};

export default AddSpendingForm;
