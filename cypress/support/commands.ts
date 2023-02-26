Cypress.Commands.add("register", () => {
  cy.log("register");
  cy.task("db:seed:user");
});

Cypress.Commands.add("login", () => {
  const sessionToken = "04456e41-ec3b-4edf-92c1-48c14e57cacd2";
  cy.log("login");
  cy.task("db:seed:session", sessionToken);
  cy.setCookie("next-auth.session-token", sessionToken, {
    domain: "localhost",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      register(): Chainable<void>;
      login(): Chainable<void>;
    }
  }
}

export {};
