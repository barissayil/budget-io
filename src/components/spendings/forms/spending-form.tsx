import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import SpendingCategory from "@modeling/spending-category";
import SpendingFormValues from "@modeling/spending-form-values";
import { SetStateAction } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";

type Props = {
  handleSubmit: ({ dateObject, amount, category }: SpendingFormValues) => Promise<void>;
  form: UseFormReturnType<SpendingFormValues, (values: SpendingFormValues) => SpendingFormValues>;
  formType: "ADD" | "UPDATE";
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const SpendingForm = ({ handleSubmit, form, formType, setOpenedSpendingModal }: Props) => {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <DatePicker
        placeholder="Date"
        {...form.getInputProps("dateObject")}
        className="mb-3"
        data-autofocus
      />
      <NumberInput placeholder="Amount" {...form.getInputProps("amount")} className="mb-3" />
      <Select
        placeholder="Category"
        data={Object.entries(SpendingCategory).map(([label, value]) => ({
          label,
          value,
        }))}
        {...form.getInputProps("category")}
      />
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
