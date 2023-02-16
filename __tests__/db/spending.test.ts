import {
  createSpending,
  deleteSpending,
  getSpendingCategories,
  getSpendingDetails,
  getSpendingsOfMonth,
  getSpendingSubcategories,
  updateSpending,
} from "@lib/db/spending";
import prismaMock from "@db/prisma-mock.setup";

const userEmail = "barissayil@protonmail.com";

const body = {
  date: "2000-01-01",
  amount: 20,
  category: "Food",
  subcategory: "Order",
  details: "Big Mama",
};

const spending = {
  id: "aaaaaaaa",
  ...body,
  userId: "bbbbbbbb",
  userEmail,
};

it("should create spending ", async () => {
  prismaMock.spending.create.mockResolvedValueOnce(spending);
  await expect(createSpending(userEmail, body)).resolves.toEqual(spending);
});

it("should get spendings of month ", async () => {
  prismaMock.spending.findMany.mockResolvedValueOnce([spending]);
  await expect(getSpendingsOfMonth(userEmail, 0)).resolves.toEqual([spending]);
});

it("should update spending ", async () => {
  prismaMock.spending.update.mockResolvedValueOnce(spending);
  await expect(updateSpending("aaaaaaaa", userEmail, body)).resolves.toEqual(spending);
});

it("should delete spending ", async () => {
  prismaMock.spending.delete.mockResolvedValueOnce(spending);
  await expect(deleteSpending("aaaaaaaa", userEmail)).resolves.toEqual(spending);
});

it("should get spending categories ", async () => {
  const spendingsWithDistinctCategories = [
    spending,
    { ...spending, category: "Housing", subcategory: "Hostel", details: "Hostel A" },
  ];
  prismaMock.spending.findMany.mockResolvedValueOnce(spendingsWithDistinctCategories);
  await expect(getSpendingCategories(userEmail)).resolves.toEqual(["Food", "Housing"]);
});

it("should get spending subcategories ", async () => {
  const spendingsWithDistinctSubcategories = [
    spending,
    { ...spending, subcategory: "Restaurant", details: "Restaurant A" },
    { ...spending, subcategory: "Groceries", details: "Carrefour" },
  ];
  prismaMock.spending.findMany.mockResolvedValueOnce(spendingsWithDistinctSubcategories);
  await expect(getSpendingSubcategories(userEmail, "Food")).resolves.toEqual([
    "Order",
    "Restaurant",
    "Groceries",
  ]);
});

it("should get spending details ", async () => {
  const spendingsWithDistinctDetails = [
    spending,
    { ...spending, details: "BurgerKing" },
    { ...spending, details: "KFC" },
    { ...spending, details: "PNY" },
  ];
  prismaMock.spending.findMany.mockResolvedValueOnce(spendingsWithDistinctDetails);
  await expect(getSpendingDetails(userEmail, "Food", "Order")).resolves.toEqual([
    "Big Mama",
    "BurgerKing",
    "KFC",
    "PNY",
  ]);
});
