import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/prisma";

type Data = {
  date: string;
  amount: number;
  category: string;
};

export default async function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { date, amount, category } = req.body;
  const spending = await prisma.spending.create({
    data: {
      date,
      amount,
      category,
    },
  });
  res.json(spending);
}
