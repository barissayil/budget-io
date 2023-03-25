import { viewports } from "cypress/support/constants";

describe("testing the 404 page", () => {
  const { baseUrl } = Cypress.config();

  viewports.forEach((viewport) => {
    describe(`with viewport ${viewport[0]}x${viewport[1]}`, () => {
      before(() => {
        cy.register();
      });

      it("should render the 404 page correctly", () => {
        cy.viewport(viewport[0], viewport[1]);

        cy.visit("/invalid-url", { failOnStatusCode: false })
          .url()
          .should("equal", baseUrl + "/invalid-url");
        cy.contains("You have found a secret place.").should("be.visible");
        cy.contains(
          "Unfortunately, this is only a 404 page." +
            " You may have mistyped the address, or the page has been moved to another URL."
        ).should("be.visible");

        cy.contains("Take me back")
          .click()
          .url()
          .should("equal", baseUrl + "/");

        cy.login()
          .visit("/invalid-url", { failOnStatusCode: false })
          .url({ timeout: 60000 })
          .should("equal", baseUrl + "/invalid-url");

        cy.contains("Take me back")
          .click()
          .url({ timeout: 60000 })
          .should("equal", baseUrl + "/tracking");
      });
    });
  });
});
