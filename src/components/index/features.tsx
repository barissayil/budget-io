import { Badge, Group, Title, Text, SimpleGrid, Container } from "@mantine/core";
import { MutableRefObject } from "react";
import {
  DeviceTablet as TabletIcon,
  UserCheck as UserCheckIcon,
  FreeRights as FreeRightsIcon,
} from "tabler-icons-react";
import FeatureCard from "@components/index/feature-card";

type Props = {
  containerRef: MutableRefObject<HTMLDivElement>;
};

const featuresData = [
  {
    title: "Responsive",
    description:
      "Have a smooth and seamless experience thanks to our responsive design," +
      " whether you're using a desktop, tablet, or smartphone.",
    icon: TabletIcon,
  },
  {
    title: "Free",
    description:
      "Enjoy a budgeting experience that's both powerful and free," +
      " our app gives you the tools you need to manage your finances without any hidden costs.",
    icon: FreeRightsIcon,
  },
  {
    title: "Privacy-focused",
    description:
      "Have peace of mind by keeping your financial information safe with our privacy-focused architecture.",
    icon: UserCheckIcon,
  },
];

const Features = ({ containerRef }: Props) => {
  return (
    <Container size="lg" py="xl" ref={containerRef}>
      <Group position="center">
        <Badge variant="filled" size="lg">
          Best budgeting app
        </Badge>
      </Group>

      <Title order={2} className="text-2xl font-black sm:text-4xl" align="center" mt="sm">
        A new kind of budgeting app just for you
      </Title>

      <Text
        color="dimmed"
        className="after:mx-auto after:mt-3 after:block after:h-0.5 after:w-11 after:bg-[#228BE6] 
                   after:content-['']"
        align="center"
        mt="md"
      >
        Say goodbye to budgeting headaches. Our privacy-focused, responsive, and open-source app
        helps you take control of your finances.
      </Text>

      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {featuresData.map(({ title, description, icon }) => (
          <FeatureCard key={title} title={title} description={description} Icon={icon} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
