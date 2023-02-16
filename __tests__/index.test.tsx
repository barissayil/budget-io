import { render, screen } from "@testing-library/react";
import Index from "src/pages/index";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

jest.mock("next-auth/react");
const mockSession: Session = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { email: "barissayil@protonmail.com" },
};
(useSession as jest.Mock).mockReturnValue([mockSession, "authenticated"]);

jest.mock("next/router", () => require("next-router-mock"));

describe("Index", () => {
  render(<Index />);
  it("renders headings", () => {
    const heroHeading = screen.getByRole("heading", {
      name: "Revolutionize your budgeting with ease",
    });
    const featuresHeading = screen.getByRole("heading", {
      name: "A new kind of budgeting app just for you",
    });

    expect(heroHeading).toBeInTheDocument();
    expect(featuresHeading).toBeInTheDocument();
  });
});
