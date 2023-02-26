before(() => {
  cy.register();
});
describe("template spec", () => {
  it("passes", () => {
    cy.visit("/").contains("See features").click();
    cy.contains("Get started").scrollIntoView().click();
    cy.url().should("include", "/auth/signin");
    cy.login();
    cy.url({ timeout: 60000 }).should("include", "/tracking");
    cy.contains("Sign out").click();
    cy.url().should("not.include", "/tracking");
    cy.contains("Sign in").click();
    cy.url().should("include", "/auth/signin");
    cy.login();
    cy.url({ timeout: 60000 }).should("include", "/tracking");
  });
});

export {};
