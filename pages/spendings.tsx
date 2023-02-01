import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import ModifiableSpendingTable from "@components/modifiable-spending-table";

type Props = {
  spendings: Spending[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const spendings = await prisma.spending.findMany({
    where: {
      user: {
        email: session.user?.email,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  console.table(spendings);
  return {
    props: { spendings },
  };
};

const SpendingsPage: NextPage<Props> = ({ spendings }: Props) => {
  return (
    <>
      <Layout>
        <ModifiableSpendingTable initialSpendings={spendings} />
      </Layout>
    </>
  );
};

export default SpendingsPage;
