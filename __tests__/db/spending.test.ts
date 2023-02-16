import {
  createSpending,
  deleteSpending,
  getSpendingsOfMonth,
  updateSpending,
} from "@lib/db/spending";
import prismaMock from "@db/prisma-mock.setup";

const id = "aaaaaaaa";
const userEmail = "barissayil@protonmail.com";
const body = {
  date: "2000-01-01",
  amount: 20,
  category: "Food",
  subcategory: "Order",
  details: "Big Mama",
};
const spending = {
  id,
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
  await expect(updateSpending(id, userEmail, body)).resolves.toEqual(spending);
});

it("should delete spending ", async () => {
  prismaMock.spending.delete.mockResolvedValueOnce(spending);
  await expect(deleteSpending(id, userEmail)).resolves.toEqual(spending);
});
