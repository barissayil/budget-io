import {
  createTransaction,
  deleteTransaction,
  getCategories,
  getDetails,
  getTransactionsOfMonth,
  getSubcategories,
  updateTransaction,
} from "@lib/db/transaction";
import prismaMock from "@db/prisma-mock.setup";
import { TransactionType } from "@prisma/client";

const userEmail = "barissayil@protonmail.com";

const body = {
  date: "2000-01-01",
  amount: 20,
  type: TransactionType.SPENDING,
  category: "Food",
  subcategory: "Order",
  details: "Big Mama",
};

const transaction = {
  id: "aaaaaaaa",
  ...body,
  userId: "bbbbbbbb",
  userEmail,
};

it("should create transaction ", async () => {
  prismaMock.transaction.create.mockResolvedValueOnce(transaction);
  await expect(createTransaction(userEmail, body)).resolves.toEqual(transaction);
});

it("should get transaction of month ", async () => {
  prismaMock.transaction.findMany.mockResolvedValueOnce([transaction]);
  await expect(getTransactionsOfMonth(userEmail, 0)).resolves.toEqual([transaction]);
});

it("should update transaction ", async () => {
  prismaMock.transaction.update.mockResolvedValueOnce(transaction);
  await expect(updateTransaction("aaaaaaaa", userEmail, body)).resolves.toEqual(transaction);
});

it("should delete transaction ", async () => {
  prismaMock.transaction.delete.mockResolvedValueOnce(transaction);
  await expect(deleteTransaction("aaaaaaaa", userEmail)).resolves.toEqual(transaction);
});

it("should get transaction categories ", async () => {
  const transactionsWithDistinctCategories = [
    transaction,
    { ...transaction, category: "Housing", subcategory: "Hostel", details: "Hostel A" },
  ];
  prismaMock.transaction.findMany.mockResolvedValueOnce(transactionsWithDistinctCategories);
  await expect(getCategories(userEmail, TransactionType.SPENDING)).resolves.toEqual([
    "Food",
    "Housing",
  ]);
});

it("should get transaction subcategories ", async () => {
  const transactionsWithDistinctSubcategories = [
    transaction,
    { ...transaction, subcategory: "Restaurant", details: "Restaurant A" },
    { ...transaction, subcategory: "Groceries", details: "Carrefour" },
  ];
  prismaMock.transaction.findMany.mockResolvedValueOnce(transactionsWithDistinctSubcategories);
  await expect(getSubcategories(userEmail, TransactionType.SPENDING, "Food")).resolves.toEqual([
    "Order",
    "Restaurant",
    "Groceries",
  ]);
});

it("should get transaction details ", async () => {
  const transactionsWithDistinctDetails = [
    transaction,
    { ...transaction, details: "BurgerKing" },
    { ...transaction, details: "KFC" },
    { ...transaction, details: "PNY" },
  ];
  prismaMock.transaction.findMany.mockResolvedValueOnce(transactionsWithDistinctDetails);
  await expect(getDetails(userEmail, TransactionType.SPENDING, "Food", "Order")).resolves.toEqual([
    "Big Mama",
    "BurgerKing",
    "KFC",
    "PNY",
  ]);
});
