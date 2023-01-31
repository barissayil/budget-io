import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@db/prisma";
import { Spending } from "@prisma/client";

type Body = {
  date: string;
  amount: number;
  category: string;
};

const handleDelete = async (id: number, res: NextApiResponse<Spending>) => {
  const spending = await prisma.spending.delete({
    where: { id },
  });
  res.json(spending);
};

const handlePut = async (id: number, { date, amount, category }: Body, res: NextApiResponse<Spending>) => {
  const spending = await prisma.spending.update({
    where: { id },
    data: { date, amount, category },
  });
  res.json(spending);
};

const handle = async (req: NextApiRequest, res: NextApiResponse<Spending>) => {
  const id = Number(req.query.id);
  switch (req.method) {
    case "DELETE":
      await handleDelete(id, res);
      break;
    case "PUT":
      await handlePut(id, req.body, res);
      break;
    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
