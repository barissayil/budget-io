before(() => {
  cy.register();
});
describe("testing the 404 page", () => {
  const { baseUrl } = Cypress.config();

  it("should render the 404 page correctly", () => {
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
      .url({ timeout: 10000 })
      .should("equal", baseUrl + "/invalid-url");

    cy.contains("Take me back")
      .click()
      .url({ timeout: 10000 })
      .should("equal", baseUrl + "/tracking");
  });
});

export {};
