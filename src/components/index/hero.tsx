import { Title, Text, Container, Button, Overlay, createStyles } from "@mantine/core";
import { signIn } from "next-auth/react";

type Props = {
  scrollToFeatures: () => void;
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: "url(https://i.imgur.com/BT4m7VQ.jpeg)",
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

const Hero = ({ scrollToFeatures }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Revolutionize your budgeting{" "}
          <Text component="span" inherit className={classes.highlight}>
            with ease
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Transform your budgeting process with Budget IO. Track and analyze expenses, set goals,
            and manage your finances. Start revolutionizing your finances now!
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg" onClick={() => signIn()}>
            Get started
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
            onClick={() => scrollToFeatures()}
          >
            See features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
