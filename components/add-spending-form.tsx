import { TextInput, Checkbox, Button, Group, Box, NumberInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Spending } from '@modeling/spending';
import { SpendingCategory } from '@modeling/spending-category';
import { Dispatch, FormEvent, SetStateAction } from 'react';

type Props = {
  spendingList: Spending[],
  setSpendingList: Dispatch<SetStateAction<Spending[]>>,
}

type Values = {
  date: Date,
  amount?: number,
  category?: SpendingCategory,
}

const AddSpendingForm = ({ spendingList, setSpendingList }: Props) => {
  const form = useForm<Values>({
    initialValues: {
      date: new Date(),
    },

    validate: {
      amount: (amount) => amount && (amount > 0) ? null : 'Invalid amount',
      category: (category) => category ? null : 'Invalid category',
    },
  });

  const handleSubmit = ({ date, amount, category }: Values) => {
    const currentSpending: Spending = {
      id: spendingList.length,
      date,
      amount: amount as number,
      category: category as SpendingCategory,
    };
    const newSpendingList = [...spendingList, currentSpending];
    setSpendingList(newSpendingList);
  }


  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <DatePicker placeholder="Date" {...form.getInputProps('date')} />
        <br/>
        <NumberInput placeholder="Amount" {...form.getInputProps('amount')} />
        <br/>
        <Select
          placeholder="Category"
          data={Object.entries(SpendingCategory).map(([label, value]) => ({ label, value }))}
          {...form.getInputProps('category')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Box>
  );
}

export default AddSpendingForm;