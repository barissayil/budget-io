import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";
import Header from "@components/header";
import Footer from "@components/footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
