import { Button, Group, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { SetStateAction } from "react";
import { OpenedTransactionModal } from "@modeling/opened-transaction-modal";
import SubcategorySelect from "@components/selects/subcategory-select";
import CategorySelect from "@components/selects/category-select";
import DetailsSelect from "@components/selects/details-select";
import TypeSelect from "@components/selects/type-select";

type Props = {
  handleSubmit: ({
    date,
    amount,
    type,
    category,
    subcategory,
    details,
  }: TransactionFormValues) => Promise<void>;
  form: UseFormReturnType<
    TransactionFormValues,
    (values: TransactionFormValues) => TransactionFormValues
  >;
  formType: "ADD" | "UPDATE";
  setOpenedTransactionModal: (value: SetStateAction<OpenedTransactionModal>) => void;
};

const TransactionForm = ({ handleSubmit, form, formType, setOpenedTransactionModal }: Props) => {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-3">
      <TypeSelect form={form} />
      <DatePicker placeholder="Date" {...form.getInputProps("date")} />
      <NumberInput
        hideControls
        placeholder="Amount"
        {...form.getInputProps("amount")}
        min={0}
        max={10000}
        precision={2}
      />
      <CategorySelect form={form} type={form.values.type} />
      <SubcategorySelect form={form} type={form.values.type} category={form.values.category} />
      <DetailsSelect
        form={form}
        type={form.values.type}
        category={form.values.category}
        subcategory={form.values.subcategory}
      />
      <Group position="right" className="mt-2">
        <Button type="button" variant="default" onClick={() => setOpenedTransactionModal(null)}>
          Cancel
        </Button>
        <Button type="submit" color={formType === "ADD" ? "cyan" : "teal"}>
          {formType === "ADD" ? "Add" : "Edit"}
        </Button>
      </Group>
    </form>
  );
};

export default TransactionForm;
