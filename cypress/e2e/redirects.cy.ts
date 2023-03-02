const { baseUrl } = Cypress.config();

before(() => {
  cy.register();
});

describe("testing redirects before logging in", () => {
  it("should redirect correctly", () => {
    cy.visit("/");
    cy.url().should("equal", baseUrl + "/");

    cy.visit("/tracking");
    cy.url().should("equal", baseUrl + "/");

    cy.contains("Get started").click();
    cy.url().should("include", baseUrl + "/auth/signin");
  });
});

describe("testing redirects after logging in", () => {
  before(() => {
    cy.login();
  });
  it("should redirect correctly", () => {
    cy.visit("/");
    cy.url().should("equal", baseUrl + "/tracking");

    cy.visit("/tracking");
    cy.url().should("equal", baseUrl + "/tracking");

    cy.contains("Sign out").click();
    cy.url().should("equal", baseUrl + "/");

    cy.visit("/tracking");
    cy.url().should("equal", baseUrl + "/");
  });
});

export {};
