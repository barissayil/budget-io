import { createSpending } from "@lib/db/spending";
import prismaMock from "@db/prisma-mock.setup";

it("should create new spending ", async () => {
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

  prismaMock.spending.create.mockResolvedValue(spending);
  await expect(createSpending(userEmail, body)).resolves.toEqual(spending);
});
