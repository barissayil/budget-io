describe("template spec", () => {
  it("passes", () => {
    cy.visit("/").contains("See features").click();
    cy.contains("Get started").scrollIntoView().click();
    cy.url().should("include", "/auth/signin");
  });
});

export {};
