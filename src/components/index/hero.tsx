import { Title, Text, Container, Button, Overlay } from "@mantine/core";
import { signIn } from "next-auth/react";

type Props = {
  scrollToFeatures: () => void;
};

const Hero = ({ scrollToFeatures }: Props) => {
  return (
    <div
      className="relative bg-[url('/budget-piggy.jpeg')] bg-cover bg-center 
                 pt-20 pb-12 min-[520px]:pt-44 min-[520px]:pb-32"
    >
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className="relative z-[1]">
        <Title
          className="text:left mb-2.5 px-4 text-3xl font-extrabold tracking-[-1] text-white 
                     min-[520px]:text-center min-[520px]:text-4xl"
        >
          Revolutionize your budgeting{" "}
          <Text component="span" inherit className="text-[#4DABF7]">
            with ease
          </Text>
        </Title>

        <Container size={640}>
          <Text
            size="lg"
            className="text-left text-base text-gray-50 min-[520px]:text-center min-[520px]:text-lg"
          >
            Transform your budgeting process with Budget IO. Track and analyze expenses, set goals,
            and manage your finances. Start revolutionizing your finances now!
          </Text>
        </Container>

        <div className="mt-9 flex flex-col justify-center px-4 min-[520px]:flex-row">
          <Button className="h-11 text-base" variant="white" size="lg" onClick={() => signIn()}>
            Get started
          </Button>
          <Button
            className="ml-0 mt-4 h-11 bg-white/[.4] text-base text-white 
                       hover:bg-white/[.45] min-[520px]:ml-4 min-[520px]:mt-0"
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
