import { LoadingOverlay, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import SpendingFormValues from "@modeling/spending-form-values";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  form: UseFormReturnType<SpendingFormValues, (values: SpendingFormValues) => SpendingFormValues>;
};

const CategorySelect = ({ form }: Props) => {
  const { data: initialData } = useSWR<string[], Error>(`/api/spending/category`);
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    setData(initialData ?? []);
  }, [initialData]);

  return (
    <div className="relative mb-3">
      <LoadingOverlay visible={!initialData} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        placeholder="Category"
        data={data}
        {...form.getInputProps("category")}
        onChange={(e) => {
          form.setFieldValue("category", e as string);
          form.setFieldValue("subcategory", "");
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

export default CategorySelect;
