import { viewports } from "cypress/support/constants";

const { baseUrl } = Cypress.config();

before(() => {
  cy.register();
});

describe("testing redirects before logging in", () => {
  viewports.forEach(([width, height]) => {
    describe(`with viewport ${width}x${height}`, () => {
      it("should redirect correctly", () => {
        cy.viewport(width, height);

        cy.visit("/");
        cy.url().should("equal", baseUrl + "/");

        cy.visit("/tracking");
        cy.url().should("equal", baseUrl + "/");

        cy.contains("Get started").click();
        cy.url().should("include", baseUrl + "/auth/signin");
      });
    });
  });
});

describe("testing redirects after logging in", () => {
  viewports.forEach(([width, height]) => {
    describe(`with viewport ${width}x${height}`, () => {
      before(() => {
        cy.login();
      });
      it("should redirect correctly", () => {
        cy.viewport(width, height);

        cy.visit("/");
        cy.url().should("equal", baseUrl + "/tracking");

        cy.visit("/tracking");
        cy.url().should("equal", baseUrl + "/tracking");

        if (width === 360) {
          cy.get(".mantine-Burger-root").click();
          cy.get(".mantine-Drawer-root").contains("Sign out").click();
        } else {
          cy.contains("Sign out").click();
        }
        cy.url().should("equal", baseUrl + "/");

        cy.visit("/tracking");
        cy.url().should("equal", baseUrl + "/");
      });
    });
  });
});
