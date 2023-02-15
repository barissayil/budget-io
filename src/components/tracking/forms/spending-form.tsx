import { Button, Group, NumberInput, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import SpendingFormValues from "@modeling/spending-form-values";
import { SetStateAction } from "react";
import { OpenedSpendingModal } from "@modeling/opened-spending-modal";
import SubcategorySelect from "@components/tracking/subcategory-select";
import CategorySelect from "@components/tracking/category-select";
import DetailsSelect from "../details-select";

type Props = {
  handleSubmit: ({
    date,
    amount,
    category,
    subcategory,
    details,
  }: SpendingFormValues) => Promise<void>;
  form: UseFormReturnType<SpendingFormValues, (values: SpendingFormValues) => SpendingFormValues>;
  formType: "ADD" | "UPDATE";
  setOpenedSpendingModal: (value: SetStateAction<OpenedSpendingModal>) => void;
};

const SpendingForm = ({ handleSubmit, form, formType, setOpenedSpendingModal }: Props) => {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <DatePicker
        placeholder="Date"
        {...form.getInputProps("date")}
        className="mb-3"
        data-autofocus
      />
      <NumberInput placeholder="Amount" {...form.getInputProps("amount")} className="mb-3" />
      <CategorySelect form={form} />
      {form.values.category ? (
        <SubcategorySelect form={form} category={form.values.category} />
      ) : (
        <Select placeholder="Subcategory" data={[]} disabled={true} className="mb-3" />
      )}
      {form.values.category && form.values.subcategory ? (
        <DetailsSelect
          form={form}
          category={form.values.category}
          subcategory={form.values.subcategory}
        />
      ) : (
        <Select placeholder="Detail" data={[]} disabled={true} className="mb-3" />
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
