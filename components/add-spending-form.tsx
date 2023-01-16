import { Spending } from "@modeling/spending";
import { SpendingCategory } from "@modeling/spending-category";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Props = {
  spendingList: Spending[],
  setSpendingList: Dispatch<SetStateAction<Spending[]>>,
}

const AddSpendingForm = ({ spendingList, setSpendingList }: Props) => {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<SpendingCategory>(SpendingCategory.Housing);

  const handleAdd = (e: FormEvent) => {
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
  }

  return (
    <form onSubmit={handleAdd}>
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
        {
          Object.entries(SpendingCategory).map(([key, value], i) => <option value={value} key={i}>{key}</option>)
        }
      </select>
      <br />
      <input type="submit" value="Add" />
    </form>
  );
}
 
export default AddSpendingForm;