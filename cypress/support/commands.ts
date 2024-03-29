import { simulateDelay } from "@lib/delay";
import { getExactRegExp } from "@lib/reg-exp";
import { shortenString } from "@lib/string";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      register(): Chainable<void>;
      login(): Chainable<void>;
      addTransaction({
        isEarning,
        dayOfTheMonth,
        amount,
        category,
        subcategory,
        details,
        month,
        previousCategories,
        previousSubcategories,
        previousDetails,
      }: {
        isEarning?: boolean;
        dayOfTheMonth: number;
        amount: number;
        category: string;
        subcategory: string;
        details: string;
        month: "CURRENT" | "PREVIOUS" | "NEXT";
        previousCategories: string[];
        previousSubcategories: string[];
        previousDetails: string[];
      }): Chainable<void>;
      checkTransactionTable({
        transactions,
        filtered,
        earned,
        spent,
        total,
        inMobileView,
      }: {
        transactions: {
          date: string;
          amount: number;
          category: string;
          subcategory: string;
          details: string;
        }[];
        filtered?: boolean;
        earned?: number;
        spent?: number;
        total: number;
        inMobileView?: boolean;
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
    isEarning,
    dayOfTheMonth,
    amount,
    category,
    subcategory,
    details,
    month,
    previousCategories,
    previousSubcategories,
    previousDetails,
  }: {
    isEarning?: boolean;
    dayOfTheMonth: number;
    amount: number;
    category: string;
    subcategory: string;
    details: string;
    month: "CURRENT" | "PREVIOUS" | "NEXT";
    previousCategories: string[];
    previousSubcategories: string[];
    previousDetails: string[];
  }) => {
    cy.log("add transaction");

    cy.intercept({
      method: "GET",
      url: "/api/transaction/previously-used/*/category",
    }).as("getCategories");
    cy.intercept({
      method: "GET",
      url: "/api/transaction/previously-used/*/*/subcategory",
    }).as("getSubcategories");
    cy.intercept({
      method: "GET",
      url: "/api/transaction/previously-used/*/*/*/details",
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

    cy.get("form").should("be.visible");

    if (isEarning) {
      cy.get('input[placeholder*="Type"]').as("CategorySelect").click();
      cy.contains("Earning").should("be.visible").click();
      cy.wait("@getCategories", { timeout: 10000 });
    }
    cy.get(".mantine-DatePickerInput-input").click();
    if (month !== "CURRENT")
      cy.get(".mantine-DatePickerInput-calendarHeaderControlIcon")
        .eq(month === "PREVIOUS" ? 0 : 1)
        .click({ waitForAnimations: false });
    cy.contains(getExactRegExp(String(dayOfTheMonth))).click({ waitForAnimations: false });

    cy.get('input[placeholder*="Amount"]').type(String(amount));

    cy.wait("@getCategories", { timeout: 10000 })
      .get('input[placeholder*="Category"]')
      .as("CategorySelect")
      .click();
    cy.get(".transaction-data-select-dropdown-portal").within(() =>
      previousCategories.forEach((previousCategory) =>
        cy.contains(getExactRegExp(previousCategory)).should("be.visible")
      )
    );
    cy.get("@CategorySelect").type(category).type("{downarrow}").type("{enter}");

    cy.wait("@getSubcategories", { timeout: 10000 })
      .get('input[placeholder*="Subcategory"]')
      .as("SubcategorySelect")
      .click();
    cy.get(".transaction-data-select-dropdown-portal")
      .eq(1)
      .within(() =>
        previousSubcategories.forEach((previousSubcategory) =>
          cy.contains(getExactRegExp(previousSubcategory)).should("be.visible")
        )
      );
    cy.get("@SubcategorySelect").type(subcategory).type("{downarrow}").type("{enter}");

    cy.wait("@getDetails", { timeout: 10000 })
      .get('input[placeholder*="Details"]')
      .as("DetailsSelect")
      .click();
    cy.get(".transaction-data-select-dropdown-portal")
      .eq(2)
      .within(() =>
        previousDetails.forEach((previousDetailsEach) =>
          cy.contains(getExactRegExp(previousDetailsEach)).should("be.visible")
        )
      );
    cy.get("@DetailsSelect").type(details).type("{downarrow}").type("{enter}");

    cy.contains(getExactRegExp("Add")).click();

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
    filtered,
    earned,
    spent,
    total,
    inMobileView,
  }: {
    transactions: {
      date: string;
      amount: number;
      category: string;
      subcategory: string;
      details: string;
    }[];
    filtered?: boolean;
    earned?: number;
    spent?: number;
    total: number;
    inMobileView?: boolean;
  }) => {
    cy.log("check transaction table");

    cy.get(
      `[data-cy="${inMobileView ? "compact-transaction-table" : "non-compact-transaction-table"}"]`
    ).within(() => {
      cy.get(".mantine-ScrollArea-root tbody").children().as("rows");
      transactions.forEach(({ date, amount, category, subcategory, details }, i) => {
        cy.get("@rows")
          .eq(i)
          .children()
          .first()
          .contains(inMobileView ? date.slice(8, 10) : date)
          .next()
          .contains(getExactRegExp(amount.toFixed(2)))
          .next()
          .contains(shortenString(category, inMobileView ? 10 : 15))
          .next()
          .as("subcategoryRow");
        if (!inMobileView) {
          cy.get("@subcategoryRow")
            .contains(shortenString(subcategory, 15))
            .next()
            .contains(shortenString(details, 15));
        }
      });

      if (transactions.length === 0) cy.contains("No transactions").should("be.visible");

      earned && cy.contains(`${earned.toFixed(2)}`).should("be.visible");
      spent && cy.contains(`${spent.toFixed(2)}`).should("be.visible");

      filtered
        ? cy.contains(`Total: ${total.toFixed(2)}`).should("be.visible")
        : cy.contains(`${total.toFixed(2)}`).should("be.visible");
    });
  }
);
