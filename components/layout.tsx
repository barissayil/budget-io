import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@modeling/spending";

type Props = {
  spendings: Spending[];
};

const Layout = ({ spendings }: Props) => {
  return (
    <main>
      <ModifiableSpendingTable initialSpendings={spendings}/>
    </main>
  );
};

export default Layout;
