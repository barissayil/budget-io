import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { TransactionType } from "@prisma/client";
import TransactionDataSelect from "@components/tracking/selects/transaction-data-select";
import { Select } from "@mantine/core";

type Props = {
  form: UseFormReturnType<
    TransactionFormValues,
    (values: TransactionFormValues) => TransactionFormValues
  >;
  type: TransactionType;
  category?: string;
};

const SubcategorySelect = ({ form, type, category }: Props) => {
  return (
    <>
      {category ? (
        <TransactionDataSelect
          form={form}
          swrKey={`/api/transaction/previously-used/${type}/${category}/subcategory`}
          placeholder={"Subcategory"}
          onChange={(e) => {
            form.setFieldValue("subcategory", e);
            form.setFieldValue("details", "");
          }}
        />
      ) : (
        <Select placeholder="Subcategory" data={[]} disabled={true} className="mb-3" />
      )}
    </>
  );
};

export default SubcategorySelect;
