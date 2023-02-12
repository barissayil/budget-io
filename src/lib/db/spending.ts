import { prisma } from "@db/prisma";
import dayjs from "dayjs";

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

export const getThisMonthsSpendings = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
      date: {
        contains: dayjs().format().substring(0, 7),
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
