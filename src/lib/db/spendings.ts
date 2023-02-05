import { prisma } from "@db/prisma";
import { getCurrentYearMonth, getToday } from "@lib/dates";

export const getSpendingsOfUser = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
  });
};

export const getTodaysSpendingsOfUser = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: getToday(),
    },
  });
};

export const getThisMonthsSpendingsOfUser = (userEmail: string) => {
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
