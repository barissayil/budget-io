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
  
  return (
    <>
      <SpendingTable spendingList={spendingList} />
      <AddSpendingForm spendingList={spendingList} setSpendingList={setSpendingList} />
      <button onClick={() => {
        setSpendingList([]);
        localStorage.removeItem('spendingList');
      }}>
        Clear
      </button>
    </>
  );
}
 
export default ModifiableSpendingTable;