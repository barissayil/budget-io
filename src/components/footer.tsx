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
            <a href="https://github.com/barissayil" target="_blank" rel="noreferrer">
              <GithubIcon size={18} />
            </a>
          </ActionIcon>
          <ActionIcon size="lg">
            <a href="https://www.linkedin.com/in/barissayil" target="_blank" rel="noreferrer">
              <LinkedinIcon size={18} />
            </a>
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
