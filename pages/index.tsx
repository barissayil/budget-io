import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Alert } from "@mantine/core";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.email) {
    return {
      redirect: {
        destination: "/spendings",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

const IndexPage: NextPage = () => {
  return (
    <>
      <Layout>
        <Alert>Please log in</Alert>
      </Layout>
    </>
  );
};

export default IndexPage;
