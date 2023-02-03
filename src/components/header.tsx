import {
  Header as MantineHeader,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReportMoney } from "tabler-icons-react";

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { data: session, status } = useSession();

  const links = ["Spendings", "Reports", "Insights", "Settings"];
  const linksCommonClasses =
    "flex items-center px-4 text-sm font-medium text-black " +
    "no-underline decoration-current decoration-solid decoration-auto ";

  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" className="h-full">
          <ReportMoney size={30} />
          <Text fz="xl" fw={500}>
            Budget IO
          </Text>

          <Group spacing={0} className="hidden h-full md:flex">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className={linksCommonClasses + "h-full hover:bg-gray-50 active:bg-gray-100"}
              >
                {link}
              </a>
            ))}
          </Group>

          <Group className="hidden md:flex">
            {session ? (
              <Button onClick={() => signOut()}>Sign out</Button>
            ) : (
              <Button onClick={() => signIn()}>Sign in</Button>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className="md:hidden" />
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className="md:hidden"
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider my="sm" color={"gray.1"} />

          {links.map((link) => (
            <a key={link} href="#" className={linksCommonClasses + "h-10 w-full active:bg-gray-50"}>
              {link}
            </a>
          ))}

          <Divider my="sm" color={"gray.1"} />

          <Group position="center" grow pb="xl" px="md">
            {session ? (
              <Button onClick={() => signOut()}>Sign out</Button>
            ) : (
              <Button onClick={() => signIn()}>Sign in</Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;