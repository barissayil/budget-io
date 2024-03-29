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
      onChange={(type) => {
        form.setFieldValue("type", type as TransactionType);
        form.setFieldValue("category", "");
      }}
      data-autofocus
    />
  );
};

export default TypeSelect;
