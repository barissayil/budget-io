import { Button, Group, Loader, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import SpendingFormValues from "@modeling/spending-form-values";
import { SetStateAction, useState } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import useSWR from "swr";

type Props = {
  handleSubmit: ({ date, amount, category }: SpendingFormValues) => Promise<void>;
  form: UseFormReturnType<SpendingFormValues, (values: SpendingFormValues) => SpendingFormValues>;
  formType: "ADD" | "UPDATE";
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const SpendingForm = ({ handleSubmit, form, formType, setOpenedSpendingModal }: Props) => {
  const { data: initialCategories } = useSWR<string[], Error>(`/api/spending/categories`);
  const [categories, setCategories] = useState(initialCategories);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <DatePicker
        placeholder="Date"
        {...form.getInputProps("date")}
        className="mb-3"
        data-autofocus
      />
      <NumberInput placeholder="Amount" {...form.getInputProps("amount")} className="mb-3" />
      {categories ? (
        <Select
          placeholder="Category"
          data={categories}
          {...form.getInputProps("category")}
          maxDropdownHeight={280}
          searchable
          clearable
          creatable
          getCreateLabel={(query) => `+ ${query}`}
          onCreate={(query) => {
            setCategories([...categories, query]);
            return query;
          }}
        />
      ) : (
        <Loader />
      )}
      <Group position="right" mt="md">
        <Button type="button" variant="default" onClick={() => setOpenedSpendingModal(null)}>
          Cancel
        </Button>
        <Button type="submit" color={formType === "ADD" ? "cyan" : "teal"}>
          {formType === "ADD" ? "Add" : "Update"}
        </Button>
      </Group>
    </form>
  );
};

export default SpendingForm;
