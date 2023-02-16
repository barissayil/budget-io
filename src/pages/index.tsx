import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import { Loader } from "@mantine/core";
import { useSession } from "next-auth/react";
import Hero from "@components/index/hero";
import Features from "@components/index/features";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.email) {
    return {
      redirect: {
        destination: "/tracking",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

const Index: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  useEffect(() => {
    if (status === "authenticated") router.push("/tracking");
  }, [router, status]);

  return (
    <Layout>
      {status === "loading" ? (
        <div className="m-10 self-center">
          <Loader />
        </div>
      ) : (
        <>
          <Hero scrollToFeatures={scrollIntoView} />
          <Features containerRef={targetRef} />
        </>
      )}
    </Layout>
  );
};

export default Index;
