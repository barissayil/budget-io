import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { TransactionType } from "@prisma/client";
import TransactionDataSelect from "@components/selects/transaction-data-select";

type Props = {
  form: UseFormReturnType<
    TransactionFormValues,
    (values: TransactionFormValues) => TransactionFormValues
  >;
  type: TransactionType;
};

const CategorySelect = ({ form, type }: Props) => {
  return (
    <TransactionDataSelect
      form={form}
      swrKey={`/api/transaction/previously-used/${type}/category`}
      placeholder={"Category"}
      onChange={(category) => {
        form.setFieldValue("category", category);
        form.setFieldValue("subcategory", "");
      }}
    />
  );
};

export default CategorySelect;
