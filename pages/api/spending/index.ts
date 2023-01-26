import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/client";

type Data = {
  date: string;
  amount: number;
  category: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.table(req.body);
  const { date, amount, category } = req.body;

  const spending = await prisma.spending.create({
    data: {
      date,
      amount,
      category,
    },
  });

  console.table(spending);

  res.json(spending);
}
