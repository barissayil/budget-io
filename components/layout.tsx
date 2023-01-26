import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";

type Props = {
  spendings: Spending[];
};

const Layout = ({ spendings }: Props) => {
  return (
    <main>
      <ModifiableSpendingTable initialSpendings={spendings} />
    </main>
  );
};

export default Layout;
