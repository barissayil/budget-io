import type { GetServerSideProps, NextPage } from "next";
import Meta from "@components/meta";
import Layout from "@components/layout";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";

type Props = {
  spendings: Spending[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const spendings = await prisma.spending.findMany({
    orderBy: {
      date: "asc",
    },
  });
  console.table(spendings);
  return {
    props: { spendings },
  };
};

const Home: NextPage<Props> = ({ spendings }: Props) => {
  return (
    <>
      <Meta />
      <Layout spendings={spendings} />
    </>
  );
};

export default Home;
