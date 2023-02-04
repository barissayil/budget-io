import { prisma } from "@db/prisma";

export const getSpendingsOfUser = (userEmail: string) => {
  return prisma.spending.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
  });
};
