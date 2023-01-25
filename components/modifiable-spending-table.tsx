import { useState, useEffect } from "react";
import { Spending } from "@modeling/spending";
import SpendingTable from "@components/spending-table";
import AddSpendingForm from "@components/add-spending-form";
import { Button, Group } from "@mantine/core";
import { SpendingCategory } from "@modeling/spending-category";

const initialSpendingList: Spending[] = [
  {
    id: 0,
    date: new Date(),
    amount: 1000,
    category: SpendingCategory.Housing,
  },
  {
    id: 1,
    date: new Date(),
    amount: 20,
    category: SpendingCategory.Food,
  },
  {
    id: 2,
    date: new Date(),
    amount: 200,
    category: SpendingCategory.Fun,
  },
];

const ModifiableSpendingTable = () => {
  const [spendingList, setSpendingList] =
    useState<Spending[]>(initialSpendingList);

  return (
    <div className="flex flex-col items-center m-10 bg-teal-100">
      <SpendingTable spendingList={spendingList} />
      <div className="flex m-10 bg-teal-200">
        <AddSpendingForm
          spendingList={spendingList}
          setSpendingList={setSpendingList}
        />
        <Button
          onClick={() => setSpendingList([])}
          color="red"
          disabled={spendingList.length === 0}
          className="w-32 self-center m-10"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ModifiableSpendingTable;
