before(() => {
  cy.register();
});
describe("testing redirects", () => {
  it("should redirect correctly", () => {
    const { baseUrl } = Cypress.config();

    cy.visit("/")
      .url()
      .should("equal", baseUrl + "/");

    cy.contains("Get started")
      .click()
      .url()
      .should("include", baseUrl + "/auth/signin");

    cy.login()
      .url({ timeout: 60000 })
      .should("equal", baseUrl + "/tracking");
    cy.visit("/")
      .url()
      .should("equal", baseUrl + "/tracking");

    cy.contains("Sign out")
      .click()
      .url()
      .should("equal", baseUrl + "/");
    cy.visit("/tracking")
      .url()
      .should("equal", baseUrl + "/");
    cy.contains("Sign in")
      .click()
      .url()
      .should("include", baseUrl + "/auth/signin");

    cy.login()
      .url({ timeout: 60000 })
      .should("equal", baseUrl + "/tracking");
  });
});

export {};
