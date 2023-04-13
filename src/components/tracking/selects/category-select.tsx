import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { TransactionType } from "@prisma/client";
import TransactionDataSelect from "@components/tracking/selects/transaction-data-select";

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
      onChange={(e) => {
        form.setFieldValue("category", e);
        form.setFieldValue("subcategory", "");
      }}
    />
  );
};

export default CategorySelect;
