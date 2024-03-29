import type { GetServerSideProps, NextPage } from "next";
import Layout from "@components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import { Loader } from "@mantine/core";
import HeroSection from "@components/sections/hero-section";
import FeaturesSection from "@components/sections/features-section";
import { useScrollIntoView } from "@mantine/hooks";
import useRouterAuth from "@hooks/use-router-auth";

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
  const { status } = useRouterAuth({ isProtected: false });
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

  return (
    <Layout>
      {status === "loading" ? (
        <div className="m-10 self-center">
          <Loader />
        </div>
      ) : (
        <>
          <HeroSection scrollToFeatures={scrollIntoView} />
          <FeaturesSection containerRef={targetRef} />
        </>
      )}
    </Layout>
  );
};

export default Index;
