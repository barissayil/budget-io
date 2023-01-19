import { useState, useEffect } from "react";
import { Spending } from "@modeling/spending";
import SpendingTable from "@components/spending-table";
import AddSpendingForm from "@components/add-spending-form";
import { Button } from '@mantine/core';
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
  const [spendingList, setSpendingList] = useState<Spending[]>(initialSpendingList);

  return (
    <>
      <SpendingTable spendingList={spendingList} />
      <br/>
      <AddSpendingForm spendingList={spendingList} setSpendingList={setSpendingList} />
      <br/>
      <Button onClick={() => setSpendingList([])} color="red" disabled={spendingList.length === 0}>
        Clear
      </Button>
    </>
  );
}
 
export default ModifiableSpendingTable;