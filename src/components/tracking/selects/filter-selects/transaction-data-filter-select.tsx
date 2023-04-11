import { LoadingOverlay, Select } from "@mantine/core";
import useSWR from "swr";

type Props = {
  swrKey: string;
  value: string | null;
  dataName: string;
  onChange: (value: string) => void;
};

const TransactionDataFilterSelect = ({ swrKey, value, dataName, onChange }: Props) => {
  const { data } = useSWR<string[], Error>(swrKey);

  return (
    <div className="relative" data-cy={`filter-${dataName}-select`}>
      <LoadingOverlay visible={!data} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        value={value}
        onChange={onChange}
        data={data ?? []}
        clearable
        placeholder={`Filter by ${dataName}`}
        maxDropdownHeight={280}
      />
    </div>
  );
};

export default TransactionDataFilterSelect;
