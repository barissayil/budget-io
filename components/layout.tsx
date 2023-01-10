import { useState, useEffect } from "react";
import { Spending } from "../modeling/spending";
import { SpendingCategory } from "../modeling/spending-category";
import SpendingTable from "./spending-table";

const Layout = () => {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  useEffect(()=> {
    const stringifiedSpendingListFromLocalStorage = localStorage.getItem('spendingList');
    if (!stringifiedSpendingListFromLocalStorage) return;
    const spendingListFromLocalStorage = JSON.parse(stringifiedSpendingListFromLocalStorage);
    setSpendingList(spendingListFromLocalStorage);
  }, [])
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<SpendingCategory>(SpendingCategory.Housing);
  return (
    <main>
      <SpendingTable spendingList={spendingList}/>
      <form onSubmit={(e) => {
          e.preventDefault();
          const currentSpending: Spending = {
            id: spendingList.length,
            date,
            amount,
            category,
          };
          const newSpendingList = [...spendingList, currentSpending];
          setSpendingList(newSpendingList);
          const stringifiedNewSpendingList = JSON.stringify(newSpendingList);
          localStorage.setItem('spendingList', stringifiedNewSpendingList);
        }}>
        <label>
            Date: <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
        </label>
        <br />
        <label>
            Amount: <input name="amount" type="number" value={amount} onChange={(e) => setAmount(+e.target.value)}></input>
        </label>
        <br />
        <label>Category: </label>
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value as SpendingCategory)}>
          <option value={SpendingCategory.Housing}>Housing</option>
          <option value={SpendingCategory.Utilities}>Utilities</option>
          <option value={SpendingCategory.Food}>Food</option>
          <option value={SpendingCategory.Health}>Health</option>
          <option value={SpendingCategory.Transport}>Transport</option>
          <option value={SpendingCategory.Fun}>Fun</option>
          <option value={SpendingCategory.Important}>Important</option>
          <option value={SpendingCategory.Wasted}>Wasted</option>
        </select>
        <br />
        <input type="submit" value="Add" />
      </form>
      <button onClick={() => {
        setSpendingList([]);
        localStorage.removeItem('spendingList');
      }}>
        Clear
      </button>
    </main>
  );
}
 
export default Layout;