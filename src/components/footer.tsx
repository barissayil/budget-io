import { Container, Group, ActionIcon } from "@mantine/core";
import {
  BrandGithub as GithubIcon,
  BrandLinkedin as LinkedinIcon,
  PigMoney as PiggyBankIcon,
} from "tabler-icons-react";

const Footer = () => {
  return (
    <div className="border-0 border-t border-solid border-gray-200">
      <Container className="flex items-center justify-between py-6">
        <PiggyBankIcon size={28} />
        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <GithubIcon size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <LinkedinIcon size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
