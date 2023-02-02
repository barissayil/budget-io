import { Container, Group, ActionIcon } from "@mantine/core";
import { BrandGithub, BrandLinkedin, ReportMoney } from "tabler-icons-react";

const Footer = () => {
  return (
    <div className="border-0 border-t border-solid border-gray-200">
      <Container className="flex items-center justify-between py-6">
        <ReportMoney size={28} />
        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandGithub size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandLinkedin size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
