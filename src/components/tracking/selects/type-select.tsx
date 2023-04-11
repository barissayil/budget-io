import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { TransactionType } from "@prisma/client";
import { Select } from "@mantine/core";

type Props = {
  form: UseFormReturnType<
    TransactionFormValues,
    (values: TransactionFormValues) => TransactionFormValues
  >;
};

const TypeSelect = ({ form }: Props) => {
  return (
    <Select
      placeholder="Type"
      data={[
        { value: "SPENDING", label: "Spending" },
        { value: "EARNING", label: "Earning" },
      ]}
      {...form.getInputProps("type")}
      onChange={(e) => {
        form.setFieldValue("type", e as TransactionType);
        form.setFieldValue("category", "");
      }}
      className="mb-3"
      data-autofocus
    />
  );
};

export default TypeSelect;
