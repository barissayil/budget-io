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
  subcategory: string;
};

const DetailsSelect = ({ form, type, category, subcategory }: Props) => {
  return (
    <TransactionDataSelect
      form={form}
      swrKey={`/api/transaction/previously-used/${type}/${category}/${subcategory}/details`}
      placeholder={"Details"}
      onChange={(e) => {
        form.setFieldValue("details", e as string);
      }}
    />
  );
};

export default DetailsSelect;
