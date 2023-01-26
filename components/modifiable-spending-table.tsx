import { useState, useEffect } from "react";
import { Spending } from "@modeling/spending";
import SpendingTable from "@components/spending-table";
import AddSpendingForm from "@components/add-spending-form";
import { Button, Group } from "@mantine/core";
import { SpendingCategory } from "@modeling/spending-category";

const initialSpendingList: Spending[] = [
  {
    id: 0,
    date: "2023-01-01",
    amount: 1000,
    category: SpendingCategory.Housing,
  },
  {
    id: 1,
    date: "2023-01-02",
    amount: 20,
    category: SpendingCategory.Food,
  },
  {
    id: 2,
    date: "2023-01-05",
    amount: 100,
    category: SpendingCategory.Fun,
  },
];

const ModifiableSpendingTable = () => {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendingList);

  return (
    <div className="flex flex-col items-center m-10 bg-teal-100">
      <SpendingTable spendings={spendings} />
      <div className="flex m-10 bg-teal-200">
        <AddSpendingForm spendings={spendings} setSpendings={setSpendings} />
        <Button
          onClick={() => setSpendings([])}
          color="red"
          disabled={spendings.length === 0}
          className="w-32 self-center m-10"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ModifiableSpendingTable;
