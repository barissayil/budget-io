import { simulateDelay } from "@lib/delay";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      register(): Chainable<void>;
      login(): Chainable<void>;
      addTransaction({
        dayOfTheMonth,
        amount,
        category,
        subcategory,
        details,
        previousMonth,
        previousCategories,
        previousSubcategories,
        previousDetails,
      }: {
        dayOfTheMonth: number;
        amount: number;
        category: string;
        subcategory: string;
        details: string;
        previousMonth?: boolean;
        previousCategories: string[];
        previousSubcategories: string[];
        previousDetails: string[];
      }): Chainable<void>;
      checkTransactionTable({
        transactions,
        total,
      }: {
        transactions: {
          date: string;
          amount: number;
          category: string;
          subcategory: string;
          details: string;
        }[];
        total: number;
      }): Chainable<void>;
    }
  }
}

Cypress.Commands.add("register", () => {
  cy.log("register");

  cy.task("db:seed:user");
});

Cypress.Commands.add("login", () => {
  cy.log("login");

  const sessionToken = "04456e41-ec3b-4edf-92c1-48c14e57cacd2";
  cy.task("db:seed:session", sessionToken);
  cy.setCookie("next-auth.session-token", sessionToken, {
    domain: "localhost",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
});

Cypress.Commands.add(
  "addTransaction",
  ({
    dayOfTheMonth,
    amount,
    category,
    subcategory,
    details,
    previousMonth,
    previousCategories,
    previousSubcategories,
    previousDetails,
  }: {
    dayOfTheMonth: number;
    amount: number;
    category: string;
    subcategory: string;
    details: string;
    previousMonth?: boolean;
    previousCategories: string[];
    previousSubcategories: string[];
    previousDetails: string[];
  }) => {
    cy.log("add transaction");

    cy.intercept({
      method: "GET",
      url: "/api/transaction/category",
    }).as("getCategories");
    cy.intercept({
      method: "GET",
      url: "/api/transaction/subcategory/*",
    }).as("getSubcategories");
    cy.intercept({
      method: "GET",
      url: "/api/transaction/details/*/*",
    }).as("getDetails");
    cy.intercept(
      {
        method: "POST",
        url: "/api/transaction",
      },
      async (req) => {
        await simulateDelay(1000);
        req.continue();
      }
    ).as("createTransaction");

    cy.contains("Add transaction").click();

    cy.get("form")
      .should("be.visible")
      .within(() => {
        cy.get('input[placeholder*="Date"]').click();
        if (previousMonth) cy.get(".mantine-DatePicker-calendarHeaderControl").first().click();
        cy.contains(new RegExp("^" + String(dayOfTheMonth) + "$")).click();

        cy.get('input[placeholder*="Amount"]').type(String(amount));

        cy.wait("@getCategories", { timeout: 10000 })
          .get('input[placeholder*="Category"]')
          .as("CategorySelect")
          .click();
        previousCategories.forEach((previousCategory) =>
          cy.contains(previousCategory).should("be.visible")
        );
        cy.get("@CategorySelect").type(category).type("{downarrow}").type("{enter}");

        cy.wait("@getSubcategories", { timeout: 10000 })
          .get('input[placeholder*="Subcategory"]')
          .as("SubcategorySelect")
          .click();
        previousSubcategories.forEach((previousSubcategory) =>
          cy.contains(previousSubcategory).should("be.visible")
        );
        cy.get("@SubcategorySelect").type(subcategory).type("{downarrow}").type("{enter}");

        cy.wait("@getDetails", { timeout: 10000 })
          .get('input[placeholder*="Details"]')
          .as("DetailsSelect")
          .click();
        previousDetails.forEach((previousDetailsEach) =>
          cy.contains(previousDetailsEach).should("be.visible")
        );
        cy.get("@DetailsSelect").type(details).type("{downarrow}").type("{enter}");

        cy.contains("Add").click();
      });

    cy.contains("Adding").should("be.visible");
    cy.contains("The transaction is being added.").should("be.visible");
    cy.wait("@createTransaction", { timeout: 10000 });
    cy.contains("Added").should("be.visible");
    cy.contains("The transaction is added.").should("be.visible");
  }
);

Cypress.Commands.add(
  "checkTransactionTable",
  ({
    transactions,
    total,
  }: {
    transactions: {
      date: string;
      amount: number;
      category: string;
      subcategory: string;
      details: string;
    }[];
    total: number;
  }) => {
    cy.log("check transaction table");

    cy.get(".hidden tbody").children().as("rows");
    transactions.forEach(({ date, amount, category, subcategory, details }, i) => {
      cy.get("@rows")
        .eq(i)
        .children()
        .first()
        .contains(date)
        .next()
        .contains(new RegExp("^" + String(amount) + "$"))
        .next()
        .contains(category)
        .next()
        .contains(subcategory)
        .next()
        .contains(details);
    });

    transactions.length === 0
      ? cy.contains("No transactions").should("be.visible")
      : cy.get("@rows").eq(transactions.length).should("not.exist");

    cy.contains(`Total: ${total}`).should("be.visible");
  }
);
