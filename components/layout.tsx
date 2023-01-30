import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";
import Header from "@components/header";

type Props = {
  spendings: Spending[];
};

const Layout = ({ spendings }: Props) => {
  return (
    <main>
      <Header />
      <ModifiableSpendingTable initialSpendings={spendings} />
    </main>
  );
};

export default Layout;
