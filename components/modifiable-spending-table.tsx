import { useState, useEffect } from "react";
import { Spending } from "@modeling/spending";
import SpendingTable from "@components/spending-table";
import AddSpendingForm from "@components/add-spending-form";

const ModifiableSpendingTable = () => {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);

  useEffect(()=> {
    const stringifiedSpendingListFromLocalStorage = localStorage.getItem('spendingList');
    if (!stringifiedSpendingListFromLocalStorage) return;
    const spendingListFromLocalStorage = JSON.parse(stringifiedSpendingListFromLocalStorage);
    setSpendingList(spendingListFromLocalStorage);
  }, [])

  const handleClear = () => {
    setSpendingList([]);
    localStorage.removeItem('spendingList');
  };

  return (
    <>
      <SpendingTable spendingList={spendingList} />
      <AddSpendingForm spendingList={spendingList} setSpendingList={setSpendingList} />
      <button onClick={handleClear}>
        Clear
      </button>
    </>
  );
}
 
export default ModifiableSpendingTable;