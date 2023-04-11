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
  category: string;
};

const SubcategorySelect = ({ form, type, category }: Props) => {
  return (
    <TransactionDataSelect
      form={form}
      swrKey={`/api/transaction/previously-used/${type}/${category}/subcategory`}
      placeholder={"Subcategory"}
      onChange={(e) => {
        form.setFieldValue("subcategory", e as string);
        form.setFieldValue("details", "");
      }}
    />
  );
};

export default SubcategorySelect;
