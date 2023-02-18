import { LoadingOverlay, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import TransactionFormValues from "@modeling/transaction-form-values";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  form: UseFormReturnType<
    TransactionFormValues,
    (values: TransactionFormValues) => TransactionFormValues
  >;
  category: string;
};

const SubcategorySelect = ({ form, category }: Props) => {
  const { data: initialData } = useSWR<string[], Error>(`/api/transaction/subcategory/${category}`);
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    setData(initialData ?? []);
  }, [initialData]);

  return (
    <div className="relative mb-3">
      <LoadingOverlay visible={!initialData} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        placeholder="Subcategory"
        data={data}
        {...form.getInputProps("subcategory")}
        onChange={(e) => {
          form.setFieldValue("subcategory", e as string);
          form.setFieldValue("details", "");
        }}
        maxDropdownHeight={280}
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ ${query}`}
        onCreate={(query) => {
          setData([...(data as string[]), query]);
          return query;
        }}
      />
    </div>
  );
};

export default SubcategorySelect;
