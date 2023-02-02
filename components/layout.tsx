import ModifiableSpendingTable from "@components/modifiable-spending-table";
import { Spending } from "@prisma/client";
import Header from "@components/header";
import Footer from "@components/footer";
import { ReactNode } from "react";
import Meta from "@components/meta";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <main className="flex flex-col flex-auto bg-slate-200">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
