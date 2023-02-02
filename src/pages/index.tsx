import type { GetServerSideProps, NextPage } from "next";
import Layout from "src/components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Alert, Loader } from "@mantine/core";
import { useSession } from "next-auth/react";

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
  const { status } = useSession();
  return (
    <>
      <Layout>
        {status === "loading" ? (
          <div className="m-10 self-center">
            <Loader />
          </div>
        ) : (
          <Alert>Please log in</Alert>
        )}
      </Layout>
    </>
  );
};

export default IndexPage;
