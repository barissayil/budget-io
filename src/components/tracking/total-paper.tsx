import { Paper, Table, Text } from "@mantine/core";
import { Transaction, TransactionType } from "@prisma/client";

type Props = {
  transactions: Transaction[];
  filtered: boolean;
};

const TotalPaper = ({ transactions, filtered }: Props) => {
  const spent = transactions
    .filter(({ type }) => type === TransactionType.SPENDING)
    .reduce((acc, { amount }) => acc + amount, 0);
  const earned = transactions
    .filter(({ type }) => type === TransactionType.EARNING)
    .reduce((acc, { amount }) => acc + amount, 0);
  const total = earned - spent;
  const rawTotal = transactions.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <Paper shadow="sm" p="sm">
      {filtered ? (
        <Text fw={500}>Total: {rawTotal.toFixed(2)}</Text>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Earned</th>
              <th>Spent</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{earned.toFixed(2)}</td>
              <td>{spent.toFixed(2)}</td>
              <td>{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </Paper>
  );
};

export default TotalPaper;
