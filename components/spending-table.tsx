import { Table } from "@mantine/core";
import { Spending } from "@modeling/spending";

type Props = {
  spendingList: Spending[];
};

const SpendingTable = ({ spendingList }: Props) => {
  const rows = spendingList.map((spending) => (
    <tr key={spending.id}>
      <td>{spending.date}</td>
      <td>{spending.amount}€</td>
      <td>{spending.category}</td>
    </tr>
  ));
  return (
    <Table className="m-10 bg-teal-200">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default SpendingTable;
