import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handlePost = async ({ date, amount, category }: Body, res: NextApiResponse<Spending>) => {
  const spending = await prisma.spending.create({
    data: {
      date,
      amount,
      category,
    },
  });
  res.json(spending);
};

export default async function handle(req: NextApiRequest, res: NextApiResponse<Spending>) {
  switch (req.method) {
    case "POST":
      await handlePost(req.body, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
