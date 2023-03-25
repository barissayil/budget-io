import { viewports } from "cypress/support/constants";

describe("testing the index page", () => {
  viewports.forEach((viewport) => {
    describe(`with viewport ${viewport[0]}x${viewport[1]}`, () => {
      it("should render the index page correctly", () => {
        cy.viewport(viewport[0], viewport[1]);

        cy.visit("/");

        cy.contains("Revolutionize your budgeting with ease").should("be.visible");
        cy.contains(
          "Transform your budgeting process with Budget IO." +
            " Track and analyze expenses, set goals, and manage your finances." +
            " Start revolutionizing your finances now!"
        ).should("be.visible");

        cy.contains("See features").click();
        cy.contains("Best budgeting app").should("be.visible");
        cy.contains("Responsive").should("be.visible");
        cy.contains("Free").should("be.visible");
        cy.contains("Privacy-focused").should("be.visible");
        cy.contains(
          "Have a smooth and seamless experience thanks to our responsive design," +
            " whether you're using a desktop, tablet, or smartphone."
        ).should("be.visible");
        cy.contains(
          "Enjoy a budgeting experience that's both powerful and free," +
            " our app gives you the tools you need to manage your finances without any hidden costs."
        ).should("be.visible");
        cy.contains(
          "Have peace of mind by keeping your financial information safe with our privacy-focused architecture."
        ).should("be.visible");
      });
    });
  });
});
