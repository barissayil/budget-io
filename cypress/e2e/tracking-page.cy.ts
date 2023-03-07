import { simulateDelay } from "@lib/delay";
import dayjs from "dayjs";

describe("testing the tracking page", { testIsolation: false }, () => {
  const today = dayjs().format().substring(0, 10);
  const firstOfPreviousMonth =
    dayjs().subtract(1, "month").format().substring(0, 10).slice(0, 8) + "01";
  const firstOfCurrentMonth = today.slice(0, 8) + "01";
  const fifthOfCurrentMonth = today.slice(0, 8) + "05";
  const tenthOfCurrentMonth = today.slice(0, 8) + "10";
  const eleventhOfCurrentMonth = today.slice(0, 8) + "11";

  const currentMonthAndYear = dayjs().format("MMMM YYYY");
  const previousMonthAndYear = dayjs().subtract(1, "months").format("MMMM YYYY");

  before(() => {
    cy.register();
    cy.login();
    cy.visit("/");
  });

  it("should have no transactions in the current month and have current month and year as title", () => {
    cy.contains("No records").should("be.visible");
    cy.get("h1").contains(currentMonthAndYear);
  });

  it("should be able to add a transaction", () => {
    cy.addTransaction(5, 30, "Food", "Restaurant", "Restaurant X", false);
    cy.contains("No records").should("not.be.visible");
    cy.checkTransactionTable([
      {
        date: fifthOfCurrentMonth,
        amount: 30,
        category: "Food",
        subcategory: "Restaurant",
        details: "Restaurant X",
      },
    ]);
  });

  it("should be able to do add more transactions", () => {
    cy.addTransaction(1, 1000, "Housing", "Rent", "Company X", false);
    cy.addTransaction(11, 25.11, "Housing", "Hostel", "Hostel X", false);
    cy.addTransaction(10, 9.99, "Food", "Groceries", "Market X", false);
    cy.checkTransactionTable([
      {
        date: firstOfCurrentMonth,
        amount: 1000,
        category: "Housing",
        subcategory: "Rent",
        details: "Company X",
      },
      {
        date: fifthOfCurrentMonth,
        amount: 30,
        category: "Food",
        subcategory: "Restaurant",
        details: "Restaurant X",
      },
      {
        date: tenthOfCurrentMonth,
        amount: 9.99,
        category: "Food",
        subcategory: "Groceries",
        details: "Market X",
      },
      {
        date: eleventhOfCurrentMonth,
        amount: 25.11,
        category: "Housing",
        subcategory: "Hostel",
        details: "Hostel X",
      },
    ]);
  });

  it("should be able to edit a transaction", () => {
    cy.intercept(
      {
        method: "PUT",
        url: "/api/transaction/*",
      },
      async (req) => {
        await simulateDelay(1000);
        req.continue();
      }
    ).as("updateTransaction");

    cy.get(".hidden .icon-tabler-edit").first().click();
    cy.get("form")
      .should("be.visible")
      .within(() => {
        cy.get('input[placeholder*="Amount"]').clear().type("900");
        cy.get('input[placeholder*="Details"]')
          .clear()
          .type("Company Y")
          .type("{downarrow}")
          .type("{enter}");
        cy.contains("Edit").click();
      });

    cy.contains("Editing").should("be.visible");
    cy.contains("The transaction is being edited.").should("be.visible");
    cy.wait("@updateTransaction", { timeout: 10000 });
    cy.contains("Edited").should("be.visible");
    cy.contains("The transaction is edited.").should("be.visible");

    cy.checkTransactionTable([
      {
        date: firstOfCurrentMonth,
        amount: 900,
        category: "Housing",
        subcategory: "Rent",
        details: "Company Y",
      },
      {
        date: fifthOfCurrentMonth,
        amount: 30,
        category: "Food",
        subcategory: "Restaurant",
        details: "Restaurant X",
      },
      {
        date: tenthOfCurrentMonth,
        amount: 9.99,
        category: "Food",
        subcategory: "Groceries",
        details: "Market X",
      },
      {
        date: eleventhOfCurrentMonth,
        amount: 25.11,
        category: "Housing",
        subcategory: "Hostel",
        details: "Hostel X",
      },
    ]);
  });

  it("should be able to delete a transaction", () => {
    cy.intercept(
      {
        method: "DELETE",
        url: "/api/transaction/*",
      },
      async (req) => {
        await simulateDelay(1000);
        req.continue();
      }
    ).as("deleteTransaction");

    cy.get(".hidden .icon-tabler-trash").eq(1).click();
    cy.contains(/^Delete$/).click();

    cy.contains("Deleting").should("be.visible");
    cy.contains("The transaction is being deleted.").should("be.visible");
    cy.wait("@deleteTransaction", { timeout: 10000 });
    cy.contains("Deleted").should("be.visible");
    cy.contains("The transaction is deleted.").should("be.visible");

    cy.checkTransactionTable([
      {
        date: firstOfCurrentMonth,
        amount: 900,
        category: "Housing",
        subcategory: "Rent",
        details: "Company Y",
      },
      {
        date: tenthOfCurrentMonth,
        amount: 9.99,
        category: "Food",
        subcategory: "Groceries",
        details: "Market X",
      },
      {
        date: eleventhOfCurrentMonth,
        amount: 25.11,
        category: "Housing",
        subcategory: "Hostel",
        details: "Hostel X",
      },
    ]);
  });

  it("should be able to filter transactions by category", () => {
    cy.get('input[placeholder*="Filter by category"]').click().type("{downarrow}").type("{enter}");
    cy.checkTransactionTable([
      {
        date: tenthOfCurrentMonth,
        amount: 9.99,
        category: "Food",
        subcategory: "Groceries",
        details: "Market X",
      },
    ]);

    cy.get('input[placeholder*="Filter by category"]').click().type("{downarrow}").type("{enter}");
    cy.checkTransactionTable([
      {
        date: firstOfCurrentMonth,
        amount: 900,
        category: "Housing",
        subcategory: "Rent",
        details: "Company Y",
      },
      {
        date: eleventhOfCurrentMonth,
        amount: 25.11,
        category: "Housing",
        subcategory: "Hostel",
        details: "Hostel X",
      },
    ]);

    cy.get('input[placeholder*="Filter by category"]').click().clear();
    cy.checkTransactionTable([
      {
        date: firstOfCurrentMonth,
        amount: 900,
        category: "Housing",
        subcategory: "Rent",
        details: "Company Y",
      },
      {
        date: tenthOfCurrentMonth,
        amount: 9.99,
        category: "Food",
        subcategory: "Groceries",
        details: "Market X",
      },
      {
        date: eleventhOfCurrentMonth,
        amount: 25.11,
        category: "Housing",
        subcategory: "Hostel",
        details: "Hostel X",
      },
    ]);
  });

  it("should have no transactions in the previous month and have previous month and year as title", () => {
    cy.get(".icon-tabler-square-arrow-left").click();
    cy.contains("No records").should("be.visible");
    cy.get("h1").contains(previousMonthAndYear);
  });

  it("should be able to add a transaction to the previous month", () => {
    cy.addTransaction(1, 1250, "Housing", "Rent", "Company Z", true);
    cy.contains("No records").should("not.be.visible");
    cy.checkTransactionTable([
      {
        date: firstOfPreviousMonth,
        amount: 1250,
        category: "Housing",
        subcategory: "Rent",
        details: "Company Z",
      },
    ]);
  });
});
