describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/").contains("See features").click();
    cy.contains("Get started").scrollIntoView().click();
    cy.url().should("include", "/auth/signin");
  });
});

export {};
