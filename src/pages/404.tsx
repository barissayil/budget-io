import type { NextPage } from "next";
import Layout from "@components/layout";
import { Title, Text, Button, Container, Group } from "@mantine/core";
import Link from "next/link";

const FourOhFour: NextPage = () => {
  return (
    <>
      <Layout>
        <Container className="my-20">
          <div className="color-white mb-9 text-center text-9xl font-black leading-none text-slate-200 md:text-[220px]">
            404
          </div>
          <Title className="text-center text-4xl font-black md:text-5xl">
            You have found a secret place.
          </Title>
          <Text color="dimmed" size="lg" align="center" className="m-auto mt-6 mb-9 max-w-lg">
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page
            has been moved to another URL.
          </Text>
          <Group position="center">
            <Button variant="subtle" size="md">
              <Link href="/">Take me back</Link>
            </Button>
          </Group>
        </Container>
      </Layout>
    </>
  );
};

export default FourOhFour;
