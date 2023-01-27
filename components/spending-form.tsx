import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import SpendingCategory from "@modeling/spending-category";
import SpendingFormValues from "@modeling/spending-form-values";

type Props = {
  handleSubmit: ({
    date,
    amount,
    category,
  }: SpendingFormValues) => Promise<void>;
  form: UseFormReturnType<
    SpendingFormValues,
    (values: SpendingFormValues) => SpendingFormValues
  >;
  formType: "ADD" | "UPDATE";
};

const SpendingForm = ({ handleSubmit, form, formType }: Props) => {
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
          <Button type="submit">{formType === "ADD" ? "Add" : "Update"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default SpendingForm;
