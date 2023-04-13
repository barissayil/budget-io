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
  swrKey: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const TransactionDataSelect = ({ form, swrKey, placeholder, onChange }: Props) => {
  const { data: initialData } = useSWR<string[], Error>(swrKey);
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    setData(initialData ?? []);
  }, [initialData]);

  return (
    <div className="relative mb-3">
      <LoadingOverlay visible={!initialData} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        placeholder={placeholder}
        data={data}
        {...form.getInputProps(placeholder.toLowerCase())}
        onChange={onChange}
        maxDropdownHeight={280}
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ ${query}`}
        onCreate={(query) => {
          setData([...data, query]);
          return query;
        }}
      />
    </div>
  );
};

export default TransactionDataSelect;
