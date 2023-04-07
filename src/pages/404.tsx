import type { NextPage } from "next";
import Layout from "@components/layout";
import { Title, Text, Button, Group } from "@mantine/core";
import Link from "next/link";

const FourOhFour: NextPage = () => {
  return (
    <Layout>
      <div className="color-white mb-9 text-center text-9xl font-black leading-none text-slate-200 sm:text-[220px]">
        404
      </div>
      <Title className="text-center text-4xl font-black sm:text-5xl">
        You have found a secret place.
      </Title>
      <Text color="dimmed" size="lg" align="center" className="m-auto mt-6 mb-9 max-w-lg px-7">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md">
          <Link href="/">Take me back</Link>
        </Button>
      </Group>
    </Layout>
  );
};

export default FourOhFour;
