import { Spending } from "../modeling/spending";

type Props = {
  spendingList: Spending[],
}

const SpendingTable = ({ spendingList }: Props) => {
  return (
    <ul>
      {
        spendingList.map((spending) => <li key={spending.id}>{`${spending.date}: ${spending.amount}€ - ${spending.category}`}</li>)
      }
    </ul>
  );
}
 
export default SpendingTable;