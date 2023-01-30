import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import { BrandGithub, BrandLinkedin, ReportMoney } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

const Footer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
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
