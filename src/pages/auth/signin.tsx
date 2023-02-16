import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";
import { signIn, useSession } from "next-auth/react";
import Layout from "@components/layout";
import { Button, Group, Paper, Text } from "@mantine/core";
import GoogleIcon from "@components/auth/icons/google-icon";
import GithubIcon from "@components/auth/icons/github-icon";
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

const SignIn = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.push("/tracking");
  }, [router, status]);

  return (
    <Layout>
      <div className="flex flex-1 justify-center">
        <Paper radius="md" p="xl" withBorder className="m-3 self-center">
          <Text size="lg" weight={500}>
            Welcome to Budget IO!
          </Text>
          <Group mb="md" mt="md">
            <Button
              leftIcon={<GithubIcon />}
              onClick={() => signIn("github")}
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              Continue with GitHub
            </Button>
            <Button
              leftIcon={<GoogleIcon />}
              variant="default"
              color="gray"
              onClick={() => signIn("google")}
            >
              Continue with Google
            </Button>
          </Group>
        </Paper>
      </div>
    </Layout>
  );
};

export default SignIn;
