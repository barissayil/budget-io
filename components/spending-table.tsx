import { TrashIcon } from "@heroicons/react/24/solid";
import { Table } from "@mantine/core";
import { Spending } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  spendings: Spending[];
  setSpendings: Dispatch<SetStateAction<Spending[]>>;
};

const SpendingTable = ({ spendings, setSpendings }: Props) => {
  const deleteSpending = async (id: number): Promise<void> => {
    const deletedSpending = await (
      await fetch(`/api/spending/${id}`, {
        method: "DELETE",
      })
    ).json();
    setSpendings(
      spendings.filter((spending) => spending.id !== deletedSpending.id)
    );
  };

  const rows = spendings.map((spending) => (
    <tr key={spending.id}>
      <td>{spending.date}</td>
      <td>{spending.amount}€</td>
      <td>{spending.category}</td>
      <td>
        <TrashIcon
          className="h-4 w-4 fill-red-600"
          onClick={() => deleteSpending(spending.id)}
        />
      </td>
    </tr>
  ));

  return (
    <Table className="m-10 bg-teal-200">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default SpendingTable;
