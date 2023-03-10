import { simulateDelay } from "@lib/delay";
import dayjs from "dayjs";

describe("testing the tracking page", { testIsolation: false }, () => {
  const today = dayjs().format().substring(0, 10);
  const firstOfPreviousMonth =
    dayjs().subtract(1, "month").format().substring(0, 10).slice(0, 8) + "01";
  const firstOfCurrentMonth = today.slice(0, 8) + "01";
  const secondOfCurrentMonth = today.slice(0, 8) + "02";
  const fifthOfCurrentMonth = today.slice(0, 8) + "05";
  const tenthOfCurrentMonth = today.slice(0, 8) + "10";
  const eleventhOfCurrentMonth = today.slice(0, 8) + "11";
  const fourteenthOfCurrentMonth = today.slice(0, 8) + "14";
  const sixteenthOfCurrentMonth = today.slice(0, 8) + "16";
  const seventeenthOfCurrentMonth = today.slice(0, 8) + "17";
  const nineteenthOfCurrentMonth = today.slice(0, 8) + "19";
  const twentiethOfCurrentMonth = today.slice(0, 8) + "20";
  const twentySecondOfCurrentMonth = today.slice(0, 8) + "22";

  const currentMonthAndYear = dayjs().format("MMMM YYYY");
  const previousMonthAndYear = dayjs().subtract(1, "months").format("MMMM YYYY");

  before(() => {
    cy.register();
    cy.login();
    cy.visit("/");
  });

  it("should have no transactions in the current month and have current month and year as title", () => {
    cy.get("h1").contains(currentMonthAndYear);
    cy.checkTransactionTable({ transactions: [], earned: 0, spent: 0, total: 0 });
  });

  it("should be able to add a transaction of type earning", () => {
    cy.addTransaction({
      isEarning: true,
      dayOfTheMonth: 2,
      amount: 8000,
      category: "Salary",
      subcategory: "Permanent",
      details: "Company X",
      previousCategories: [],
      previousSubcategories: [],
      previousDetails: [],
    });
    cy.checkTransactionTable({
      transactions: [
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
          details: "Company X",
        },
      ],
      earned: 8000,
      spent: 0,
      total: 8000,
    });
  });

  it("should be able to add a transaction of type spending", () => {
    cy.addTransaction({
      dayOfTheMonth: 5,
      amount: 30,
      category: "Food",
      subcategory: "Restaurant",
      details: "Restaurant X",
      previousCategories: [],
      previousSubcategories: [],
      previousDetails: [],
    });
    cy.checkTransactionTable({
      transactions: [
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
          details: "Company X",
        },
        {
          date: fifthOfCurrentMonth,
          amount: 30,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant X",
        },
      ],
      earned: 8000,
      spent: 30,
      total: 8000 - 30,
    });
  });

  it("should be able to do add more transactions", () => {
    cy.addTransaction({
      dayOfTheMonth: 1,
      amount: 1000,
      category: "Housing",
      subcategory: "Rent",
      details: "Company X",
      previousCategories: ["Food"],
      previousSubcategories: [],
      previousDetails: [],
    });
    cy.addTransaction({
      dayOfTheMonth: 11,
      amount: 25.11,
      category: "Housing",
      subcategory: "Hostel",
      details: "Hostel X",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Rent"],
      previousDetails: [],
    });
    cy.addTransaction({
      dayOfTheMonth: 10,
      amount: 9.99,
      category: "Food",
      subcategory: "Groceries",
      details: "Market X",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Restaurant"],
      previousDetails: [],
    });
    cy.addTransaction({
      dayOfTheMonth: 14,
      amount: 30,
      category: "Housing",
      subcategory: "Hostel",
      details: "Hostel Y",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Rent", "Hostel"],
      previousDetails: ["Hostel X"],
    });
    cy.addTransaction({
      dayOfTheMonth: 16,
      amount: 10,
      category: "Housing",
      subcategory: "Hostel",
      details: "Hostel Z",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Rent", "Hostel"],
      previousDetails: ["Hostel X", "Hostel Y"],
    });
    cy.addTransaction({
      dayOfTheMonth: 17,
      amount: 100,
      category: "Food",
      subcategory: "Restaurant",
      details: "Restaurant Y",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Restaurant", "Groceries"],
      previousDetails: ["Restaurant X"],
    });
    cy.addTransaction({
      dayOfTheMonth: 19,
      amount: 200,
      category: "Food",
      subcategory: "Restaurant",
      details: "Restaurant Z",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Restaurant", "Groceries"],
      previousDetails: ["Restaurant X", "Restaurant Y"],
    });
    cy.addTransaction({
      dayOfTheMonth: 20,
      amount: 4,
      category: "Food",
      subcategory: "Groceries",
      details: "Market Y",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Restaurant", "Groceries"],
      previousDetails: ["Market X"],
    });
    cy.addTransaction({
      dayOfTheMonth: 22,
      amount: 10,
      category: "Food",
      subcategory: "Groceries",
      details: "Market Z",
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Restaurant", "Groceries"],
      previousDetails: ["Market X", "Market Y"],
    });
    cy.checkTransactionTable({
      transactions: [
        {
          date: firstOfCurrentMonth,
          amount: 1000,
          category: "Housing",
          subcategory: "Rent",
          details: "Company X",
        },
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      earned: 8000,
      spent: 1000 + 30 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10,
      total: 8000 - (1000 + 30 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10),
    });
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

    cy.checkTransactionTable({
      transactions: [
        {
          date: firstOfCurrentMonth,
          amount: 900,
          category: "Housing",
          subcategory: "Rent",
          details: "Company Y",
        },
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      earned: 8000,
      spent: 900 + 30 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10,
      total: 8000 - (900 + 30 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10),
    });
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

    cy.get(".hidden .icon-tabler-trash").eq(2).click();
    cy.contains(/^Delete$/).click();

    cy.contains("Deleting").should("be.visible");
    cy.contains("The transaction is being deleted.").should("be.visible");
    cy.wait("@deleteTransaction", { timeout: 10000 });
    cy.contains("Deleted").should("be.visible");
    cy.contains("The transaction is deleted.").should("be.visible");

    cy.checkTransactionTable({
      transactions: [
        {
          date: firstOfCurrentMonth,
          amount: 900,
          category: "Housing",
          subcategory: "Rent",
          details: "Company Y",
        },
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
          details: "Company X",
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      earned: 8000,
      spent: 900 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10,
      total: 8000 - (900 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10),
    });
  });

  it("should be able to filter transactions by type", () => {
    cy.get('input[placeholder*="Filter by type"]').should("be.visible").click();
    cy.contains("Earning").should("be.visible").click();
    cy.checkTransactionTable({
      transactions: [
        {
          date: secondOfCurrentMonth,
          amount: 8000,
          category: "Salary",
          subcategory: "Permanent",
          details: "Company X",
        },
      ],
      total: 8000,
      filtered: true,
    });

    cy.get('input[placeholder*="Filter by type"]').should("be.visible").click();
    cy.contains("Spending").should("be.visible").click();
    cy.checkTransactionTable({
      transactions: [
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      total: 900 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10,
      filtered: true,
    });
  });

  it("should be able to filter transactions by category", () => {
    cy.get('input[placeholder*="Filter by category"]').click().type("{downarrow}").type("{enter}");
    cy.checkTransactionTable({
      transactions: [
        {
          date: tenthOfCurrentMonth,
          amount: 9.99,
          category: "Food",
          subcategory: "Groceries",
          details: "Market X",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      total: 9.99 + 100 + 200 + 4 + 10,
      filtered: true,
    });

    cy.get('input[placeholder*="Filter by category"]').click().type("{downarrow}").type("{enter}");
    cy.checkTransactionTable({
      transactions: [
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
      ],
      total: 900 + 25.11 + 30 + 10,
      filtered: true,
    });

    cy.get('input[placeholder*="Filter by category"]').click().clear();
    cy.checkTransactionTable({
      transactions: [
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
        {
          date: fourteenthOfCurrentMonth,
          amount: 30,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Y",
        },
        {
          date: sixteenthOfCurrentMonth,
          amount: 10,
          category: "Housing",
          subcategory: "Hostel",
          details: "Hostel Z",
        },
        {
          date: seventeenthOfCurrentMonth,
          amount: 100,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Y",
        },
        {
          date: nineteenthOfCurrentMonth,
          amount: 200,
          category: "Food",
          subcategory: "Restaurant",
          details: "Restaurant Z",
        },
        {
          date: twentiethOfCurrentMonth,
          amount: 4,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Y",
        },
        {
          date: twentySecondOfCurrentMonth,
          amount: 10,
          category: "Food",
          subcategory: "Groceries",
          details: "Market Z",
        },
      ],
      total: 900 + 9.99 + 25.11 + 30 + 10 + 100 + 200 + 4 + 10,
      filtered: true,
    });
  });

  it("should have no transactions in the previous month and have previous month and year as title", () => {
    cy.get(".icon-tabler-square-arrow-left").click();
    cy.get("h1").contains(previousMonthAndYear);
    cy.checkTransactionTable({ transactions: [], total: 0, filtered: true });
  });

  it("should be able to add a transaction to the previous month", () => {
    cy.addTransaction({
      dayOfTheMonth: 1,
      amount: 1250,
      category: "Housing",
      subcategory: "Rent",
      details: "Company Z",
      previousMonth: true,
      previousCategories: ["Food", "Housing"],
      previousSubcategories: ["Rent", "Hostel"],
      previousDetails: ["Company Y"],
    });
    cy.checkTransactionTable({
      transactions: [
        {
          date: firstOfPreviousMonth,
          amount: 1250,
          category: "Housing",
          subcategory: "Rent",
          details: "Company Z",
        },
      ],
      total: 1250,
      filtered: true,
    });
  });
});
