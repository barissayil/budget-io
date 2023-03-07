import Header from "@components/header";
import Footer from "@components/footer";
import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Budget IO</title>
        <meta name="description" content="Budget information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-auto flex-col bg-slate-100">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
