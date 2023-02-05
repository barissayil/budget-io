import { prisma } from "@db/prisma";
import { getCurrentYearMonth, getToday } from "@lib/dates";

export const getSpendings = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
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
