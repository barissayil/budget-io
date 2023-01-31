import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handleDelete = async (id: string, res: NextApiResponse<Spending>) => {
  const spending = await prisma.spending.delete({
    where: { id },
  });
  res.json(spending);
};

const handlePut = async (
  id: string,
  { date, amount, category }: Body,
  res: NextApiResponse<Spending>
) => {
  const spending = await prisma.spending.update({
    where: { id },
    data: { date, amount, category },
  });
  res.json(spending);
};

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending>) => {
  switch (req.method) {
    case "DELETE":
      await handleDelete(req.query.id as string, res);
      break;
    case "PUT":
      await handlePut(req.query.id as string, req.body, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
