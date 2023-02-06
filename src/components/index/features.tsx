import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { MutableRefObject } from "react";
import {
  DeviceTablet as IconDeviceTablet,
  UserCheck as IconUserCheck,
  FreeRights as IconFreeRights,
} from "tabler-icons-react";

type Props = {
  containerRef: MutableRefObject<HTMLDivElement>;
};

const featuresData = [
  {
    title: "Responsive",
    description:
      "Have a smooth and seamless experience thanks to our responsive design," +
      " whether you're using a desktop, tablet, or smartphone.",
    icon: IconDeviceTablet,
  },
  {
    title: "Free",
    description:
      "Enjoy a budgeting experience that's both powerful and free," +
      " our app gives you the tools you need to manage your finances without any hidden costs",
    icon: IconFreeRights,
  },
  {
    title: "Privacy-focused",
    description:
      "Have peace of mind by keeping your financial information safe with our privacy-focused architecture.",
    icon: IconUserCheck,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

const Features = ({ containerRef }: Props) => {
  const { classes, theme } = useStyles();
  const features = featuresData.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
      <feature.icon size={50} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg" py="xl" ref={containerRef}>
      <Group position="center">
        <Badge variant="filled" size="lg">
          Best budgeting app
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Responsive, privacy-focused, and open-source budgeting app
      </Title>

      <Text color="dimmed" className={classes.description} align="center" mt="md">
        Say goodbye to budgeting headaches. Our privacy-focused, responsive, and open-source app
        helps you take control of your finances.
      </Text>

      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
