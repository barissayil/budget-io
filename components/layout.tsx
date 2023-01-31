import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";
import Header from "@components/header";
import Footer from "@components/footer";

type Props = {
  spendings: Spending[];
};

const Layout = ({ spendings }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-auto">
        <ModifiableSpendingTable initialSpendings={spendings} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
