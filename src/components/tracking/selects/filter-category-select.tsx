import { LoadingOverlay, Select } from "@mantine/core";
import { TransactionType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

type Props = {
  selectedType: TransactionType;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
};

const FilterCategorySelect = ({ selectedType, selectedCategory, setSelectedCategory }: Props) => {
  const { data: categories } = useSWR<string[], Error>(
    `/api/transaction/previously-used/${selectedType}/category`
  );

  return (
    <div className="relative mb-3">
      <LoadingOverlay visible={!categories} overlayBlur={2} loaderProps={{ size: "sm" }} />
      <Select
        value={selectedCategory}
        onChange={setSelectedCategory}
        data={categories ?? []}
        clearable
        searchable
        mx={1}
        placeholder="Filter by category"
        maxDropdownHeight={280}
      />
    </div>
  );
};

export default FilterCategorySelect;
