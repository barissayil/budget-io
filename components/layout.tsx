import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";
import Header from "@components/header";
import Footer from "@components/footer";

type Props = {
  spendings: Spending[];
};

const Layout = ({ spendings }: Props) => {
  return (
    <main>
      <Header />
      <ModifiableSpendingTable initialSpendings={spendings} />
      <Footer />
    </main>
  );
};

export default Layout;
