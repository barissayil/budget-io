import prisma from "@db/prisma";
import { TransactionType } from "@prisma/client";
import dayjs from "dayjs";

type Body = {
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  subcategory: string;
  details: string;
};

export const createTransaction = (
  userEmail: string,
  { date, amount, type, category, subcategory, details }: Body
) => {
  return prisma.transaction.create({
    data: {
      user: { connect: { email: userEmail } },
      date,
      amount,
      type,
      category,
      subcategory,
      details,
    },
  });
};

export const getTransactionsOfMonth = (userEmail: string, monthIndex: number) => {
  return prisma.transaction.findMany({
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

export const updateTransaction = (
  id: string,
  userEmail: string,
  { date, amount, category, subcategory, details }: Body
) => {
  return prisma.transaction.update({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
    data: { date, amount, category, subcategory, details },
  });
};

export const deleteTransaction = (id: string, userEmail: string) => {
  return prisma.transaction.delete({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
  });
};

export const getCategories = async (userEmail: string, type: TransactionType) => {
  const transactionsWithDistinctCategories = await prisma.transaction.findMany({
    where: {
      user: {
        email: userEmail,
      },
      type,
    },
    distinct: "category",
  });
  return transactionsWithDistinctCategories.map((transaction) => transaction.category);
};

export const getSubcategories = async (
  userEmail: string,
  type: TransactionType,
  category: string
) => {
  const transactionsWithDistinctSubcategories = await prisma.transaction.findMany({
    where: {
      user: {
        email: userEmail,
      },
      type,
      category,
    },
    distinct: "subcategory",
  });
  return transactionsWithDistinctSubcategories.map((transaction) => transaction.subcategory);
};

export const getDetails = async (
  userEmail: string,
  type: TransactionType,
  category: string,
  subcategory: string
) => {
  const transactionsWithDistinctDetails = await prisma.transaction.findMany({
    where: {
      user: {
        email: userEmail,
      },
      type,
      category,
      subcategory,
    },
    distinct: "details",
  });
  return transactionsWithDistinctDetails.map((transaction) => transaction.details);
};
