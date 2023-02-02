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
      <main className="flex flex-auto flex-col bg-slate-200">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
