import { prisma } from "@db/prisma";
import { getCurrentYear, getCurrentYearMonth, getToday } from "@lib/dates";

type Body = {
  date: string;
  amount: number;
  category: string;
};

export const createSpending = (userEmail: string, { date, amount, category }: Body) => {
  return prisma.spending.create({
    data: {
      date,
      amount,
      category,
      user: { connect: { email: userEmail } },
    },
  });
};

export const getTodaysSpendings = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: getToday(),
    },
  });
};

export const getThisMonthsSpendings = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: {
        contains: getCurrentYearMonth(),
      },
    },
  });
};

export const getThisYearsSpendings = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: {
        contains: getCurrentYear(),
      },
    },
  });
};

export const updateSpending = (id: string, userEmail: string, { date, amount, category }: Body) => {
  return prisma.spending.update({
    where: {
      id_userEmail: {
        id,
        userEmail,
      },
    },
    data: { date, amount, category },
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
