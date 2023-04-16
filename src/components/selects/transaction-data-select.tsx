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
  maxDropdownHeight: number;
};

const TransactionDataSelect = ({
  form,
  swrKey,
  placeholder,
  onChange,
  maxDropdownHeight,
}: Props) => {
  const { data: initialData } = useSWR<string[], Error>(swrKey);
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    setData(initialData ?? []);
  }, [initialData]);

  return (
    <div className="relative">
      <LoadingOverlay visible={!initialData} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        placeholder={placeholder}
        data={data}
        {...form.getInputProps(placeholder.toLowerCase())}
        onChange={onChange}
        maxDropdownHeight={maxDropdownHeight}
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ ${query}`}
        onCreate={(query) => {
          setData([...data, query]);
          return query;
        }}
        withinPortal
        portalProps={{ className: "transaction-data-select-dropdown-portal" }}
      />
    </div>
  );
};

export default TransactionDataSelect;
