import {
  createStyles,
  Header as MantineHeader,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReportMoney } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colors.gray[1]}`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { data: session, status } = useSession();

  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <ReportMoney size={30} />
          <Text fz="xl" fw={500}>
            Budget IO
          </Text>

          <Group sx={{ height: "100%" }} spacing={0} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Spendings
            </a>
            <a href="#" className={classes.link}>
              Reports
            </a>
            <a href="#" className={classes.link}>
              Insights
            </a>
            <a href="#" className={classes.link}>
              Settings
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            {session ? (
              <Button onClick={() => signOut()}>Sign out</Button>
            ) : (
              <Button onClick={() => signIn()}>Sign in</Button>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider my="sm" color={"gray.1"} />

          <a href="#" className={classes.link}>
            Spendings
          </a>
          <a href="#" className={classes.link}>
            Reports
          </a>
          <a href="#" className={classes.link}>
            Insights
          </a>
          <a href="#" className={classes.link}>
            Settings
          </a>

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
