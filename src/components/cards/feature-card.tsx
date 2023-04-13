import { Card, Text } from "@mantine/core";
import { Icon } from "tabler-icons-react";

type Props = {
  title: string;
  description: string;
  Icon: Icon;
};

const FeatureCard = ({ title, description, Icon }: Props) => {
  return (
    <Card
      key={title}
      shadow="md"
      radius="md"
      p="xl"
      className="border border-solid border-gray-100"
    >
      <Icon size={50} color="#228BE6" />
      <Text
        size="lg"
        weight={500}
        className="after:mt-3 after:block after:h-0.5 after:w-11 after:bg-[#228BE6] after:content-['']"
        mt="md"
      >
        {title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {description}
      </Text>
    </Card>
  );
};

export default FeatureCard;
