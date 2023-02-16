import prisma from "@db/prisma";
import dayjs from "dayjs";

type Body = {
  date: string;
  amount: number;
  category: string;
  subcategory: string;
  details: string;
};

export const createSpending = (
  userEmail: string,
  { date, amount, category, subcategory, details }: Body
) => {
  return prisma.spending.create({
    data: {
      date,
      amount,
      category,
      subcategory,
      details,
      user: { connect: { email: userEmail } },
    },
  });
};

export const getSpendingsOfMonth = (userEmail: string, monthIndex: number) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: {
        contains: dayjs().subtract(monthIndex, "months").format().substring(0, 7),
      },
    },
  });
};

export const updateSpending = (
  id: string,
  userEmail: string,
  { date, amount, category, subcategory, details }: Body
) => {
  return prisma.spending.update({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
    data: { date, amount, category, subcategory, details },
  });
};

export const deleteSpending = (id: string, userEmail: string) => {
  return prisma.spending.delete({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
  });
};

export const getSpendingCategories = async (userEmail: string) => {
  const spendingsWithDistinctCategories = await prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    distinct: "category",
  });
  return spendingsWithDistinctCategories.map((spending) => spending.category);
};

export const getSpendingSubcategories = async (userEmail: string, category: string) => {
  const spendingsWithDistinctSubcategories = await prisma.spending.findMany({
    where: {
      category,
      user: {
        email: userEmail,
      },
    },
    distinct: "subcategory",
  });
  return spendingsWithDistinctSubcategories.map((spending) => spending.subcategory);
};

export const getSpendingDetails = async (
  userEmail: string,
  category: string,
  subcategory: string
) => {
  const spendingsWithDistinctDetails = await prisma.spending.findMany({
    where: {
      category,
      subcategory,
      user: {
        email: userEmail,
      },
    },
    distinct: "details",
  });
  return spendingsWithDistinctDetails.map((spending) => spending.details);
};
